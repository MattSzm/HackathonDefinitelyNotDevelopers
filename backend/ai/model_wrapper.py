from ai.text_rank import TextRank
import re
from gensim.summarization.summarizer import INPUT_MIN_LENGTH
from ai.abstractive_summarization import SummarizationModel


class ModelWrapper:
    def __init__(self):
        self.text_rank = TextRank()
        self.min_length = INPUT_MIN_LENGTH
        self.dl_model = SummarizationModel("/home/mateusz/BITEHack/backend/models/Hackaton-20210117T094303Z-002/Hackaton")
    
    def summarize(self, text:str):
        sentences = self.tokenize(text)
        if len(sentences) > self.min_length:
            return self.text_rank.summarize(
                self.pre_processing_remove_newlines(
                    self.pre_processing_remove_links(text)))
        return self.dl_model.predict(text)

    def pre_processing_remove_links(self, text):
        return re.sub(r"http\S+", "", text)

    def pre_processing_remove_newlines(self, text):
        return text.replace('\n', ' ').replace('\r', '')

    def tokenize(self, text):
        sentences = re.split(r"[.!?]", text)
        sentences = [sent.strip(" ") for sent in sentences]
        return sentences

    def learn_more(self, content, result):
        self.dl_model.learn_more(content, result)