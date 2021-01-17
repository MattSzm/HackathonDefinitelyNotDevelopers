from kafka import KafkaConsumer
import json
from ai.model_wrapper import ModelWrapper


ai_connector = ModelWrapper()
consumer = KafkaConsumer("hackaton", group_id='first_group',
                         key_deserializer=lambda v: v.decode('ascii'),
                         value_deserializer=lambda x: json.loads(x),
                         auto_offset_reset='earliest')

if __name__ == '__main__':
    for msg in consumer:
        ai_connector.learn_more(msg.value['content'], msg.value['result'])