from kafka import KafkaConsumer
import json
from ai.abstractive_summarization import SummarizationModel


ai = SummarizationModel("/home/mateusz/BITEHack/backend/models/Hackaton-20210117T034637Z-001/Hackaton")
consumer = KafkaConsumer("hackaton", group_id='first_group',
                         key_deserializer=lambda v: v.decode('ascii'),
                         value_deserializer=lambda x: json.loads(x),
                         auto_offset_reset='earliest')

if __name__ == '__main__':
    for msg in consumer:
        ai.learn_more(msg.value['content'], msg.value['result'])