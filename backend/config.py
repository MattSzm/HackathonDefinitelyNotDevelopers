import logging
from os import environ, urandom

class Config:
   def __init__(self):
       logging.basicConfig(level=logging.DEBUG)
   DEBUG = False
   TESTING = False
   SECRET_KEY = environ.get('APP_SECRET_KEY', default=urandom(16))

class DevelopmentConfig(Config):
   DEBUG = True
   SECRET_KEY = 'INSECURE_FOR_LOCAL_DEVELOPMENT'
   CASSANDRA_KEYSPACE = 'hackaton'
   CASSANDRA_HOSTS = ['localhost']
   UPLOAD_FOLDER = '/home/mateusz/BITEHack/backend/media'


class ProductionConfig(Config):
   DEBUG = False
   TESTING = False
