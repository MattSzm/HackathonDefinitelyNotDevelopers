import gensim


class TextRank:
    def __init__(self):
        pass
    
    def summarize(self, text):
        return gensim.summarization.summarize(text)