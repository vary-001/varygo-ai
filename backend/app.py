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
# ✅ Download required NLTK resources at startup
# -----------------------------
nltk.download("punkt")
nltk.download("punkt_tab")

# -----------------------------
# Flask app setup
# -----------------------------
app = Flask(__name__)

# Allow frontend (e.g., React on Netlify) to access this API
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Logging setup
logging.basicConfig(level=logging.INFO)

# -----------------------------
# Load model and data files
# -----------------------------
MODEL_DIR = "model"
model_path = os.path.join(MODEL_DIR, "chatbot_model.pkl")
vectorizer_path = os.path.join(MODEL_DIR, "vectorizer.pkl")
tags_path = os.path.join(MODEL_DIR, "tags.pkl")
data_path = os.path.join(MODEL_DIR, "rwanda_tourism_data.json")

try:
    with open(model_path, "rb") as f:
        model = pickle.load(f)

    with open(vectorizer_path, "rb") as f:
        vectorizer = pickle.load(f)

    with open(tags_path, "rb") as f:
        tags = pickle.load(f)

    with open(data_path, "r") as f:
        intents = json.load(f)["intents"]

    logging.info("✅ Model and data loaded successfully.")
except Exception as e:
    logging.error("❌ Error loading model files: %s", e)
    raise e

stemmer = PorterStemmer()

# -----------------------------
# Helper: Generate chatbot response
# -----------------------------
def get_response(user_input: str) -> str:
    try:
        tokens = nltk.word_tokenize(user_input.lower())
        stemmed = [stemmer.stem(w) for w in tokens]
        processed_input = " ".join(stemmed)
        X = vectorizer.transform([processed_input])
        predicted_tag_index = model.predict(X)[0]
        predicted_tag = tags[predicted_tag_index]

        for intent in intents:
            if intent["tag"] == predicted_tag:
                return random.choice(intent["responses"])
    except Exception as e:
        logging.error("Error processing input: %s", e)

    # Default fallback response
    return "I'm not sure how to answer that yet, but I'm learning more about Rwanda every day!"

# -----------------------------
# Routes
# -----------------------------
@app.route("/")
def home():
    return "🌍 Rwanda Tourism Chatbot API is running!"

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        message = data.get("message", "")
        response = get_response(message)
        return jsonify({"response": response})
    except Exception as e:
        logging.error("Error in /api/chat: %s", e)
        return jsonify({"error": str(e)}), 500

# -----------------------------
# Run app (Render sets PORT)
# -----------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
