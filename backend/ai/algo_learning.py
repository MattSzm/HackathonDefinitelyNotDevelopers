from kafka import KafkaConsumer
import json

if __name__ == '__main__':
    consumer = KafkaConsumer("hackaton", group_id='first_group',
                             key_deserializer=lambda v: v.decode('ascii'),
                             value_deserializer=lambda x: json.loads(x),
                             auto_offset_reset='earliest')
    for msg in consumer:
        print(msg.key, msg.value['content'], sep='\n')