import json
import pickle
import numpy as np
import nltk
from nltk.stem import PorterStemmer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import logging

logging.basicConfig(level=logging.INFO)

# -----------------------------
# Ensure NLTK data is available
# -----------------------------
try:
    nltk.data.find("tokenizers/punkt")
except LookupError:
    nltk.download("punkt")

# -----------------------------
# Load JSON data
# -----------------------------
with open("model/rwanda_tourism_data.json") as f:
    data = json.load(f)

stemmer = PorterStemmer()
patterns = []
tags = []

# Flatten data into patterns + tags
for intent in data['intents']:
    for pattern in intent['patterns']:
        tokens = nltk.word_tokenize(pattern.lower())
        tokens = [w for w in tokens if w.isalnum()]  # remove punctuation
        stemmed = [stemmer.stem(w) for w in tokens]
        patterns.append(' '.join(stemmed))
        tags.append(intent['tag'])

# -----------------------------
# Vectorize patterns
# -----------------------------
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(patterns)

# -----------------------------
# Encode tags
# -----------------------------
unique_tags = sorted(list(set(tags)))  # sorted to maintain consistent order
tag_to_index = {tag: i for i, tag in enumerate(unique_tags)}
y = np.array([tag_to_index[tag] for tag in tags])

# -----------------------------
# Train classifier
# -----------------------------
model = MultinomialNB()
model.fit(X, y)

# -----------------------------
# Save model and metadata
# -----------------------------
with open('model/chatbot_model.pkl', 'wb') as f:
    pickle.dump(model, f)
with open('model/vectorizer.pkl', 'wb') as f:
    pickle.dump(vectorizer, f)
with open('model/tags.pkl', 'wb') as f:
    pickle.dump(unique_tags, f)

logging.info("✅ Model trained and saved successfully!")
