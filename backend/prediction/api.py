from prediction.model import Prediction
from user.model import User
from flask_restful import Resource, fields, marshal_with, reqparse, abort
from flask import jsonify, request
from app import redis_client, app
import json
import os


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
    'saved_time': fields.Float
}


class PredictText(Resource):
    @marshal_with(predict_text_response_fields)
    def post(self):
        args = predict_text.parse_args()
        if args.get('token') is None or args.get('text') is None:
            abort(500)

        user = User.objects.filter(id = args['token']).first()
        text_to_predict = args['text']
        words_count_before = len(text_to_predict.split(' '))
        if words_count_before < 50:
            abort(404)

        # ai working
        # need to be split as well
        words_count_after = 1
        saved_time = (words_count_before-words_count_after)/150


        created_prediction_object = Prediction.objects.create(user=user.id,
                                  content=text_to_predict,
                                  category="sport",
                                  prediction='fsdfsd')

        res = {
            'id': created_prediction_object.id,
            'prediction': created_prediction_object.prediction,
            'words_count_before': words_count_before,
            'words_count_after': words_count_after,
            'saved_time': saved_time}
        return res, 200


# class UserHistory(Resource):
#     results = []
#     user_predictions = Prediction.objects.filter(user=)