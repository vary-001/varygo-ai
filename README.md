# 🌍 VaryGo AI — Rwanda Tourism Chatbot 🤖✨

[![GitHub stars](https://img.shields.io/github/stars/vary-001/varygo-ai?style=for-the-badge)](https://github.com/vary-001/varygo-ai/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/vary-001/varygo-ai?style=for-the-badge)](https://github.com/vary-001/varygo-ai/network)
[![GitHub issues](https://img.shields.io/github/issues/vary-001/varygo-ai?style=for-the-badge)](https://github.com/vary-001/varygo-ai/issues)
[![GitHub license](https://img.shields.io/github/license/vary-001/varygo-ai?style=for-the-badge)](https://github.com/vary-001/varygo-ai/blob/main/LICENSE)

> 🧠 **AI-powered chatbot built with React (frontend) + Flask (backend) + Python NLP**, designed to help users explore the tourism and cultural attractions of Rwanda 🇷🇼.  
> Open-source, free to use, and ready for your next adventure. 🌿🦍🏞️

---

## 🖼 Project Banner
![VaryGo AI Banner](https://res.cloudinary.com/dliw90eyq/image/upload/v1760204025/Generated_Image_October_08_2025_-_7_42AM_utyej3.png)

---

## 🧭 Table of Contents
- [✨ Features](#-features)
- [📂 Project Structure](#-project-structure)
- [⚡ Installation](#-installation)
  - [Frontend (React)](#frontend-react)
  - [Backend (Flask + Python)](#backend-flask--python)
- [🤖 Training the AI](#-training-the-ai)
- [🧪 Running the Project](#-running-the-project)
- [🌐 API Endpoint](#-api-endpoint)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

- 💬 **Real-time text chat** powered by AI trained on Rwanda tourism Q&A  
- 🌍 Covers gorilla trekking, national parks, culture, accommodations & travel tips  
- 🔥 Modern UI with **React + TailwindCSS**  
- ⚡ Fast & lightweight Flask backend using Python + NLP (NLTK + scikit-learn)  
- 📡 Simple REST API between frontend & backend  
- 🧠 Extensible — you can train the AI with your own dataset  

---

## 📂 Project Structure

tour-with-vary/
├── client/ ← React frontend
│ ├── public/
│ ├── src/
│ ├── package.json
│ └── vite.config.js
│
├── server/ ← Flask backend + Python AI
│ ├── app.py
│ ├── requirements.txt
│ ├── models/
│ ├── routes/
│ ├── db/
│ └── venv/
│
├── .gitignore
├── README.md
└── package.json (optional for monorepo)


---

## ⚡ Installation

### Frontend (React)
```bash
cd client
npm install
npm run dev


Backend (Flask + Python)
cd server
python3 -m venv venv
source venv/bin/activate   # On Linux / macOS
pip install -r requirements.txt

🤖 Training the AI
Prepare your tourism Q&A data in JSON or CSV format inside server/models/data/.

Run the training script to generate the model:
python ai/train.py


The trained model will be saved and used for chatbot responses.

🧪 Running the Project

👉 In one terminal, run the backend:

cd server
source venv/bin/activate
flask run
👉 In another terminal, run the frontend:

cd client
npm run dev


Visit: http://localhost:5173 (or similar port) to chat with VaryGo AI 🦍💬

🌐 API Endpoint

POST http://localhost:5000/api/chat
Request:

{ "message": "Tell me about Volcanoes National Park" }


Response:

{ "response": "Volcanoes National Park is home to Rwanda's famous mountain gorillas..." }

🤝 Contributing

Contributions are welcome! 🫱🏽‍🫲🏾

Fork the repo

Create a new branch (git checkout -b feature-name)

Make your changes

Commit & push

Open a Pull Request 🚀

📄 License

This project is licensed under the MIT License.
See the LICENSE
 file for details.

🌟 Star this repo if you like it!

Let’s make Rwandan tourism smarter with open-source AI 🤝🇷🇼✨


---

### 🪄 **Steps to Add this to GitHub**

1. Make sure you’re in your project root:
   ```bash
   cd ~/Projects/React+python/Tour-vary-ai/tour-with-vary


Create the file:

nano README.md


👉 Paste everything above inside and save.

Commit & push:

git add README.md
git commit -m "📝 Add full project README with banner and badges"
git push