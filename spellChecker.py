import re
import nltk
from nltk.corpus import words

nltk.download("words")

def spell_check(text):
    misspelled_words = []
    for word in re.findall(r'\w+', text):
        if word.lower() not in words.words():
            misspelled_words.append(word)
    return misspelled_words

print(spell_check("My nmae is Enoch"))


