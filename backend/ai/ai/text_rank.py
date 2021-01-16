import gensim

# TODO: remove
# LONG_TEXT = "Groups including the British Medical Association have written to ministers saying medical workers fear they could be at risk of unlawful killing charges. It comes as the UK's chief medical officers said the NHS could be overwhelmed in weeks. The government said staff should not have to fear legal action. The letter from the health organisations points out that the prime minister warned in November that the NHS being overwhelmed would be a medical and moral disaster, where doctors and nurses could be forced to choose which patients to treat, who would live and who would die. It said: With the chief medical officers now determining that there is a material risk of the NHS being overwhelmed within weeks, our members are worried that not only do they face being put in this position but also that they could subsequently be vulnerable to a criminal investigation by the police. Co-ordinated by the Medical Protection Society (MPS), the letter was signed by the British Medical Association, the Doctors' Association UK, the Hospital Consultants and Specialists Association, the Royal College of Surgeons of Edinburgh, the British Association of Physicians of Indian Origin and Medical Defence Shield."
# print(gensim.summarization.summarizer.INPUT_MIN_LENGTH)
# print(gensim.summarization.summarize(LONG_TEXT))

class TextRank:

    def __init__(self):
        self.min_length = gensim.summarization.summarizer.INPUT_MIN_LENGTH
    
    def summarize(self, text):
        return gensim.summarization.summarize(text)