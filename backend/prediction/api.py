from prediction.model import Prediction
from user.model import User
from flask_restful import Resource, fields, marshal_with, reqparse, abort
from flask import jsonify, request
from app import redis_client, app
import json
import os
from user.api import check_user_parser
import textract
from werkzeug.utils import secure_filename
import random


predict_text = reqparse.RequestParser()
predict_text.add_argument('token', type=str,
                          help='Enter token', required=True)
predict_text.add_argument('text', type=str,
                          help='enter text to predict', required=False)

predict_text_response_fields = {
    'id': fields.String,
    'prediction': fields.String,
    'words_count_before': fields.Integer,
    'words_count_after': fields.Integer,
    'saved_time_seconds': fields.Float
}

# ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
ALLOWED_EXTENSIONS = {'pdf'}
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def generate_better_name(filename):
    parts = filename.rsplit('.', 1)
    return parts[0] + str(random.randint(0,1000000)) + '.' + parts[1]


class PredictText(Resource):
    @marshal_with(predict_text_response_fields)
    def post(self):
        args = predict_text.parse_args()
        if args.get('token') is None or args.get('text') is None:
            abort(404)

        user = User.objects.filter(id = args['token']).first()
        if not user:
            abort(404)

        text_to_predict = args['text']
        words_count_before = len(text_to_predict.split(' '))
        #todo: change to 50
        if words_count_before < 1:
            abort(409)

        # ai working
        # need to be split as well
        words_count_after = 1
        #saved time in seconds
        saved_time = (words_count_before-words_count_after)/150*60


        created_prediction_object = Prediction.objects.create(user=user.id,
                                  content=text_to_predict,
                                  category="music",
                                  prediction='hgfghg',
                                  saved_time=saved_time)

        res = {
            'id': created_prediction_object.id,
            'prediction': created_prediction_object.prediction,
            'words_count_before': words_count_before,
            'words_count_after': words_count_after,
            'saved_time_seconds': saved_time}
        return res, 200


class PredictFromPdf(Resource):
    @marshal_with(predict_text_response_fields)
    def post(self):
        args = check_user_parser.parse_args()
        if args.get('token') is None:
            abort(404)
        if 'file' not in request.files:
            abort(404, message='NO FILE')

        user = User.objects.filter(id=args['token']).first()
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
            #todo: change to 50
            if words_count_before < 1:
                abort(409)

            # ai working
            # need to be split as well
            words_count_after = 1
            #saved time in seconds
            saved_time = (words_count_before-words_count_after)/150*60


            created_prediction_object = Prediction.objects.create(user=user.id,
                                      content=converted_text_to_predict,
                                      category="music",
                                      prediction='from pdf',
                                      saved_time=saved_time)

            res = {
                'id': created_prediction_object.id,
                'prediction': created_prediction_object.prediction,
                'words_count_before': words_count_before,
                'words_count_after': words_count_after,
                'saved_time_seconds': saved_time}
            return res, 200


class UserHistory(Resource):
    def post(self):
        args = check_user_parser.parse_args()
        user = User.objects.filter(id = args['token']).first()
        if not user:
            abort(404)
        user_predictions = Prediction.objects.filter(user=user.id)
        results = {'data': []}
        saved_time_overall = 0
        for pred in user_predictions:
            results['data'].append({
                'id': str(pred.id),
                'content': pred.content,
                'prediction': pred.prediction
            })
            saved_time_overall += pred.saved_time if pred.saved_time is not None else 0
        results['saved_time'] = saved_time_overall
        return results, 200

