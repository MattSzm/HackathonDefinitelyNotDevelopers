import re

class ExtractLinks:
    def __init__(self):
        pass

    def get_all_links(self, text):
        return re.findall(r'(https?://[^\s]+)', text)