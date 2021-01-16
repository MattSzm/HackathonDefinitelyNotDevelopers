from ai.text_rank import TextRank

class ModelWarper:
    def __init__(self):
        self.text_rank = TextRank()
    
    def summarize(self, text:str):
        # TODO: add model
        return self.text_rank.summarize(text)