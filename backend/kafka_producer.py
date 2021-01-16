from kafka import KafkaProducer
import json

producer = KafkaProducer(bootstrap_servers=('localhost:9092', 'localhost:9093',
                                            'localhost:9094'),
                         key_serializer=str.encode,
                         value_serializer=lambda x: json.dumps(x).encode('utf-8'),
                         compression_type='gzip',
                         retries=10,
                         linger_ms=100)