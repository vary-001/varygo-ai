from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import json
import random
import nltk
from nltk.stem import PorterStemmer
import os
import logging

# -----------------------------
# Ensure NLTK tokenizer is available
# -----------------------------
try:
    nltk.data.find("tokenizers/punkt")
except LookupError:
    nltk.download("punkt")

# -----------------------------
# Flask app setup
# -----------------------------
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
logging.basicConfig(level=logging.INFO)

# -----------------------------
# Load trained model and data
# -----------------------------
model_path = os.path.join("model", "chatbot_model.pkl")
vectorizer_path = os.path.join("model", "vectorizer.pkl")
tags_path = os.path.join("model", "tags.pkl")
data_path = os.path.join("model", "rwanda_tourism_data.json")

try:
    model = pickle.load(open(model_path, 'rb'))
    vectorizer = pickle.load(open(vectorizer_path, 'rb'))
    tags = pickle.load(open(tags_path, 'rb'))

    with open(data_path) as f:
        intents = json.load(f)['intents']

    logging.info("Model and data loaded successfully.")
except Exception as e:
    logging.error("Error loading model files: %s", e)
    raise e

stemmer = PorterStemmer()

# -----------------------------
# Helper function for chatbot responses
# -----------------------------
def get_response(user_input):
    try:
        tokens = nltk.word_tokenize(user_input.lower())
        tokens = [w for w in tokens if w.isalnum()]  # remove punctuation
        stemmed = [stemmer.stem(w) for w in tokens]
        processed_input = ' '.join(stemmed)
        X = vectorizer.transform([processed_input])
        probs = model.predict_proba(X)[0]
        predicted_tag_index = probs.argmax()
        max_prob = probs[predicted_tag_index]
        predicted_tag = tags[predicted_tag_index]

        logging.info("User input: '%s' | Predicted tag: '%s' | Probability: %.2f", 
                     user_input, predicted_tag, max_prob)

        # Only return response if confidence > 30%
        if max_prob < 0.3:
            return "I'm not sure how to answer that yet, but I'm learning more about Rwanda every day!"

        for intent in intents:
            if intent['tag'] == predicted_tag:
                return random.choice(intent['responses'])

    except Exception as e:
        logging.error("Error processing input: %s", e)

    return "I'm not sure how to answer that yet, but I'm learning more about Rwanda every day!"

# -----------------------------
# Routes
# -----------------------------
@app.route('/')
def home():
    return "Chatbot API is running!"

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get('message', '')
        response = get_response(message)
        return jsonify({'response': response})
    except Exception as e:
        logging.error("Error in /api/chat: %s", e)
        return jsonify({'error': str(e)}), 500

# -----------------------------
# Run app
# -----------------------------
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
