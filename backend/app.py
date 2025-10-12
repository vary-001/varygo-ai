from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import json
import random
import nltk
from nltk.stem import PorterStemmer
import os

app = Flask(__name__)
CORS(app)

# Load trained model and data
model_path = os.path.join("model", "chatbot_model.pkl")
vectorizer_path = os.path.join("model", "vectorizer.pkl")
tags_path = os.path.join("model", "tags.pkl")
data_path = os.path.join("model", "rwanda_tourism_data.json")

model = pickle.load(open(model_path, 'rb'))
vectorizer = pickle.load(open(vectorizer_path, 'rb'))
tags = pickle.load(open(tags_path, 'rb'))

with open(data_path) as f:
    intents = json.load(f)['intents']

stemmer = PorterStemmer()

def get_response(user_input):
    tokens = nltk.word_tokenize(user_input.lower())
    stemmed = [stemmer.stem(w) for w in tokens]
    processed_input = ' '.join(stemmed)
    X = vectorizer.transform([processed_input])
    predicted_tag_index = model.predict(X)[0]
    predicted_tag = tags[predicted_tag_index]

    for intent in intents:
        if intent['tag'] == predicted_tag:
            return random.choice(intent['responses'])
    return "I'm not sure how to answer that yet, but I'm learning more about Rwanda every day!"

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message', '')
    response = get_response(message)
    return jsonify({'response': response})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
