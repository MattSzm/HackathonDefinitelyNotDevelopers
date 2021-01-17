from tensorflow.keras.models import load_model
import tensorflow as tf
import os
import numpy as np
import pickle
import json
import re
from keras.preprocessing.sequence import pad_sequences

class SummarizationModel:

    def __init__(self, filepath: str):
        self.max_text_len=100
        self.max_summary_len=15
        self.model = load_model(filepath=os.path.join(filepath, "base_model"))
        self.encoder_model = load_model(filepath=os.path.join(filepath, "encoder_model"))
        self.decoder_model = load_model(filepath=os.path.join(filepath, "decoder_model"))
        with open(os.path.join(filepath, "target_word_index.txt"), 'r') as json_file:
            self.target_word_index = json.load(json_file)
        with open(os.path.join(filepath, "reverse_target_word_index.txt"), 'r') as json_file:
            self.reverse_target_word_index = json.load(json_file)
        with open(os.path.join(filepath, "x_tokenizer.pickle"), 'rb') as handle:
            self.x_tokenizer = pickle.load(handle)
        with open(os.path.join(filepath, "y_tokenizer.pickle"), 'rb') as handle:
            self.y_tokenizer = pickle.load(handle)
        

    def save_model(self, filepath):
        self.model.save(os.path.join(filepath, "backup_model"))

    def decode_sequence(self, input_seq):
        # Encode the input as state vectors.
        e_out, e_h, e_c = self.encoder_model.predict(input_seq)
        
        # Generate empty target sequence of length 1.
        target_seq = np.zeros((1,1))
        
        # Populate the first word of target sequence with the start word.
        target_seq[0, 0] = self.target_word_index['sostok']

        stop_condition = False
        decoded_sentence = ''
        while not stop_condition:
        
            output_tokens, h, c = self.decoder_model.predict([target_seq] + [e_out, e_h, e_c])

            # Sample a token
            sampled_token_index = np.argmax(output_tokens[0, -1, :])
            sampled_token = self.reverse_target_word_index[str(sampled_token_index)]
            
            if(sampled_token!='eostok'):
                decoded_sentence += ' '+sampled_token

            # Exit condition: either hit max length or find stop word.
            if (sampled_token == 'eostok'  or len(decoded_sentence.split()) >= (self.max_summary_len-1)):
                stop_condition = True

            # Update the target sequence (of length 1).
            target_seq = np.zeros((1,1))
            target_seq[0, 0] = sampled_token_index

            # Update internal states
            e_h, e_c = h, c

        return decoded_sentence
    
    #Removes non-alphabetic characters:
    def clean_text(self, text):
        
        #ORDER OF REGEX IS VERY VERY IMPORTANT!!!!!!
        
        text=re.sub("(\\t)", ' ', str(text)).lower() #remove escape charecters
        text=re.sub("(\\r)", ' ', str(text)).lower() 
        text=re.sub("(\\n)", ' ', str(text)).lower()
        
        text=re.sub("(__+)", ' ', str(text)).lower()   #remove _ if it occurs more than one time consecutively
        text=re.sub("(--+)", ' ', str(text)).lower()   #remove - if it occurs more than one time consecutively
        text=re.sub("(~~+)", ' ', str(text)).lower()   #remove ~ if it occurs more than one time consecutively
        text=re.sub("(\+\++)", ' ', str(text)).lower()   #remove + if it occurs more than one time consecutively
        text=re.sub("(\.\.+)", ' ', str(text)).lower()   #remove . if it occurs more than one time consecutively
        
        text=re.sub(r"[<>()|&©ø\[\]\'\",;?~*!]", ' ', str(text)).lower() #remove <>()|&©ø"',;?~*!
        
        text=re.sub("(mailto:)", ' ', str(text)).lower() #remove mailto:
        text=re.sub(r"(\\x9\d)", ' ', str(text)).lower() #remove \x9* in text
        text=re.sub("([iI][nN][cC]\d+)", 'INC_NUM', str(text)).lower() #replace INC nums to INC_NUM
        text=re.sub("([cC][mM]\d+)|([cC][hH][gG]\d+)", 'CM_NUM', str(text)).lower() #replace CM# and CHG# to CM_NUM
        
        
        text=re.sub("(\.\s+)", ' ', str(text)).lower() #remove full stop at end of words(not between)
        text=re.sub("(\-\s+)", ' ', str(text)).lower() #remove - at end of words(not between)
        text=re.sub("(\:\s+)", ' ', str(text)).lower() #remove : at end of words(not between)
        
        text=re.sub("(\s+.\s+)", ' ', str(text)).lower() #remove any single charecters hanging between 2 spaces
        
        #Replace any url as such https://abc.xyz.net/btextse/sdf-5327 ====> abc.xyz.net
        try:
            url = re.search(r'((https*:\/*)([^\/\s]+))(.[^\s]+)', str(text))
            repl_url = url.group(3)
            text = re.sub(r'((https*:\/*)([^\/\s]+))(.[^\s]+)',repl_url, str(text))
        except:
            pass #there might be emails with no url in them
        

        
        text = re.sub("(\s+)",' ',str(text)).lower() #remove multiple spaces
        
        #Should always be last
        text=re.sub("(\s+.\s+)", ' ', str(text)).lower() #remove any single charecters hanging between 2 spaces

        
        
        return text
        
    def predict(self, text: str):
        text = self.clean_text(text) #ok
        #print(text)
        x_tr_seq = self.x_tokenizer.texts_to_sequences(np.array([text]))
        #print(x_tr_seq)
        x_tr = pad_sequences(x_tr_seq,  maxlen=self.max_text_len, padding='post')
        #print(x_tr[0])
        #print("XD")
        #print(x_tr[0].reshape(1, self.max_text_len))
        #print(x_tr[0].reshape(1, self.max_text_len).shape)
        return self.decode_sequence(x_tr[0].reshape(1, self.max_text_len))


#test = SummarizationModel(os.path.join("saved_models"))
#test.predict("saurav kant an alumnus of upgrad and iiit-b pg program in machine learning and artificial intelligence was sr systems engineer at infosys with almost years of work experience the program and upgrad 360-degree career support helped him transition to data scientist at tech mahindra with salary hike upgrad online power learning has powered lakh+ careers")