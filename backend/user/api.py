from user.model import User
from flask_restful import Resource, fields, marshal_with, reqparse, abort
from flask import jsonify, request
from app import redis_client, app
import json
import os

check_user_parser = reqparse.RequestParser()
check_user_parser.add_argument('token', type=str,
                                help='Enter token', required=True)


class UserRegistration(Resource):
    def get(self):
        if not request.headers.get('Authorization', False):
            new_user = User.objects.create()
            return {'token': str(new_user.id)}, 201
        token = request.headers['Authorization']
        token_parsed = token.split(' ')[1]
        if User.objects.filter(id=token_parsed).first():
            return str(True), 200
        return str(False), 404


    def post(self):
        args = check_user_parser.parse_args()
        if User.objects.filter(id = args['token']).first():
            return str(True), 200
        return str(False), 404