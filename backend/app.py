from flask import Flask
from flask_cqlalchemy import CQLAlchemy
import os
from config import DevelopmentConfig
from flask_restful import Api
import redis
import logging
from flask_cors import CORS
from ai.model_wrapper import ModelWrapper
from prediction.extract_links import ExtractLinks


app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
if os.getenv('CQLENG_ALLOW_SCHEMA_MANAGEMENT') is None:
    os.environ['CQLENG_ALLOW_SCHEMA_MANAGEMENT'] = '1'

db = CQLAlchemy(app)
api = Api(app)
redis_client = redis.Redis(host="localhost", port="6379", db=0)
CORS(app)
ai_connector = ModelWrapper()
links_extractor = ExtractLinks()


#todo logging to file
# logging.basicConfig(filename='test.log')


from user.api import UserRegistration
from prediction.api import (PredictText,
                            UserHistory,
                            PredictFromFile,
                            PlotsSummary,
                            TrainAlgorithm)
api.add_resource(UserRegistration, "/api/newuser")
api.add_resource(PredictText, "/api/predicttext")
api.add_resource(PredictFromFile, "/api/predictfile")
api.add_resource(UserHistory, '/api/userhistory')
api.add_resource(PlotsSummary, '/api/plotsummary')
api.add_resource(TrainAlgorithm, '/api/trainalgo')

if __name__ == '__main__':
    app.run()
