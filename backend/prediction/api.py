from prediction.model import Prediction
from user.model import User
from flask_restful import Resource, fields, marshal_with, reqparse, abort
from flask import jsonify, request
from app import redis_client, app, ai_connector, links_extractor
import os
from datetime import datetime
import textract
from werkzeug.utils import secure_filename
import random
import json
from kafka_producer import producer


predict_text = reqparse.RequestParser()
predict_text.add_argument('text', type=str,
                          help='enter text to predict',
                          required=False)

train_algorithm = reqparse.RequestParser()
train_algorithm.add_argument('id', type=str,
                             help='enter prediction id',
                             required=False)
train_algorithm.add_argument('text', type=str,
                             help='enter fixed text',
                             required=False)


predict_text_response_fields = {
    'id': fields.String,
    'prediction': fields.String,
    'created_time': fields.String,
    'words_count_before': fields.Integer,
    'words_count_after': fields.Integer,
    'saved_time_seconds': fields.Float,
    'links': fields.List(fields.String)
}

ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'gif'}
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def generate_better_name(filename):
    parts = filename.rsplit('.', 1)
    return parts[0] + str(random.randint(0,1000000)) + '.' + parts[1]


class PredictText(Resource):
    @marshal_with(predict_text_response_fields)
    def post(self):
        if (not request.headers.get('Authorization') or
                request.headers.get('Authorization') == 'Token undefined' or
                request.headers.get('Authorization') == ''):
            abort(404, message='Bad token')
        args = predict_text.parse_args()
        if args.get('text') is None:
            abort(404)

        token = request.headers['Authorization']
        token_parsed = token.split(' ')[1]
        user = User.objects.filter(id = token_parsed).first()
        if not user:
            abort(404)

        text_to_predict = args['text']
        words_count_before = len(text_to_predict.split(' '))
        if words_count_before < 20:
            abort(409)

        predicted = ai_connector.summarize(text_to_predict)
        links_in_text = list(set(links_extractor.get_all_links(text_to_predict)))
        words_count_after = len(predicted.split(' '))
        saved_time = (words_count_before-words_count_after)/150*60

        created_prediction_object = Prediction.objects.create(user=user.id,
                                  content=text_to_predict,
                                  category=".",
                                  prediction=predicted,
                                  saved_time=saved_time,
                                  created_time=datetime.now())
        res = {
            'id': created_prediction_object.id,
            'prediction': created_prediction_object.prediction,
            'created_time': str(created_prediction_object.created_time),
            'words_count_before': words_count_before,
            'words_count_after': words_count_after,
            'saved_time_seconds': saved_time,
            'links': links_in_text}
        return res, 200


class PredictFromFile(Resource):
    @marshal_with(predict_text_response_fields)
    def post(self):
        if (not request.headers.get('Authorization') or
                request.headers.get('Authorization') == 'Token undefined' or
                request.headers.get('Authorization') == ''):
            abort(404, message = 'No user')

        if 'file' not in request.files:
            abort(404, message='NO FILE')

        token = request.headers['Authorization']
        token_parsed = token.split(' ')[1]
        user = User.objects.filter(id = token_parsed).first()
        if not user:
            abort(404)
        file = request.files['file']
        if file.filename == '':
            abort(404, message='No selected file')
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_url = os.path.join(app.config['UPLOAD_FOLDER'],
                                     generate_better_name(filename))
            file.save(file_url)

            text = textract.process(file_url)
            converted_text_to_predict = text.decode('utf-8')

            words_count_before = len(converted_text_to_predict.split(' '))
            if words_count_before < 20:
                abort(409)

            predicted = ai_connector.summarize(converted_text_to_predict)
            links_in_text = list(set(links_extractor.get_all_links(converted_text_to_predict)))
            words_count_after = len(predicted.split(' '))
            saved_time = (words_count_before-words_count_after)/150*60


            created_prediction_object = Prediction.objects.create(user=user.id,
                                      content=converted_text_to_predict,
                                      category=".",
                                      prediction=predicted,
                                      saved_time=saved_time,
                                      created_time=datetime.now())

            res = {
                'id': created_prediction_object.id,
                'prediction': created_prediction_object.prediction,
                'created_time': str(created_prediction_object.created_time),
                'words_count_before': words_count_before,
                'words_count_after': words_count_after,
                'saved_time_seconds': saved_time,
                'links': links_in_text}
            return res, 200
        return {}, 404

class UserHistory(Resource):
    def get(self):
        if (not request.headers.get('Authorization') or
                request.headers.get('Authorization') == 'Token undefined' or
                request.headers.get('Authorization') == ''):
            abort(404, message='Bad token')
        token = request.headers['Authorization']
        token_parsed = token.split(' ')[1]
        user = User.objects.filter(id=token_parsed).first()
        if not user:
            abort(404)

        user_predictions = Prediction.objects.filter(user=user.id)
        results = {'data': []}
        saved_time_overall = 0

        for pred in user_predictions:
            pred_created_time = str(pred.created_time) if pred.created_time else ''
            results['data'].append({
                'id': str(pred.id),
                'content': pred.content,
                'prediction': pred.prediction,
                'created_time': pred_created_time
            })
            saved_time_overall += pred.saved_time if pred.saved_time is not None else 0
        results['saved_time'] = saved_time_overall
        return results, 200


class PlotsSummary(Resource):
    def get(self):
        cache = redis_client.get('summary')
        if not cache:
            all_predictions = Prediction.objects.all()
            filtered_predictions = [pred for pred in all_predictions if pred.created_time]
            filtered_predictions.sort(key=lambda x: x.created_time)

            #x - date
            #y1 - len before
            #y2 - len after
            #y3 - saved time
            x, y1, y2, y3 = [], [], [], []
            prev = None
            curr_x, curr_y1, curr_y2, curr_y3 = None, None, None, None
            total_time_in_seconds = 0
            for single in filtered_predictions:
                date = str(single.created_time).split(' ')[0]
                total_time_in_seconds += single.saved_time
                if not prev:
                    prev = date
                    curr_x = date
                    curr_y1 = len(single.content.split(' '))
                    curr_y2 = len(single.prediction.split(' '))
                    curr_y3 = single.saved_time
                elif date != prev:
                    x.append(curr_x)
                    y1.append(curr_y1)
                    y2.append(curr_y2)
                    y3.append(int(curr_y3))
                    prev = date
                    curr_x = date
                    curr_y1 = len(single.content.split(' '))
                    curr_y2 = len(single.prediction.split(' '))
                    curr_y3 = single.saved_time
                else:
                    curr_y1 += len(single.content.split(' '))
                    curr_y2 += len(single.prediction.split(' '))
                    curr_y3 += single.saved_time
            x.append(curr_x)
            y1.append(curr_y1)
            y2.append(curr_y2)
            y3.append(int(curr_y3))

            res = {
                'x': x,
                'y1': y1,
                'y2': y2,
                'y3': y3,
                'total_saved_time': total_time_in_seconds
            }
            json_url = os.path.join(app.config['UPLOAD_FOLDER'] + "/dumb_data",
                                    "dumb_summary.json")
            with open(json_url) as file:
                data = json.load(file)
                res['x'] = res['x'] + data['x']
                res['y1'] = res['y1'] + list(reversed(data['y1']))
                res['y2'] = res['y2'] + list(reversed(data['y2']))
                res['y3'] = res['y3'] + list(reversed(data['y3']))
            redis_client.set('summary', json.dumps(res), ex=14400)
        else:
            res = json.loads(cache)
        return res, 200


class TrainAlgorithm(Resource):
    def post(self):
        if (not request.headers.get('Authorization') or
                request.headers.get('Authorization') == 'Token undefined' or
                request.headers.get('Authorization') == ''):
            abort(404, message='Bad token')
        token = request.headers['Authorization']
        token_parsed = token.split(' ')[1]
        user = User.objects.filter(id=token_parsed).first()
        if not user:
            abort(404)

        args = train_algorithm.parse_args()
        if args.get('text') is None or args.get('id') is None:
            abort(400, message='Bad data')
        if args.get('text') == '':
            abort(409, message='No changes')

        found_prediction = Prediction.objects.filter(user=token_parsed,
                                                     id=args['id']).first()
        if found_prediction:
            producer.send('hackaton',
                          key=str(args['id']),
                          value={'content': found_prediction.content,
                                 'result': args['text']})
            return str(True), 200
        return str(False), 304


