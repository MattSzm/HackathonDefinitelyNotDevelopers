from flask import Flask
from flask_cqlalchemy import CQLAlchemy
import os
from config import DevelopmentConfig
from flask_restful import Api
import redis
import logging
from flask_cors import CORS


app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
if os.getenv('CQLENG_ALLOW_SCHEMA_MANAGEMENT') is None:
    os.environ['CQLENG_ALLOW_SCHEMA_MANAGEMENT'] = '1'

db = CQLAlchemy(app)
api = Api(app)
redis_client = redis.Redis(host="localhost", port="6379", db=0)
CORS(app)

#logging to file
# logging.basicConfig(filename='test.log')


from user.api import UserRegistration
api.add_resource(UserRegistration, "/api/newuser")

if __name__ == '__main__':
    app.run()
