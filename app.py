import os
from flask import Flask, render_template, request, jsonify
import time
import re

# Get exact absolute paths to prevent Vercel Serverless Folder wipeout errors
base_dir = os.path.dirname(os.path.abspath(__file__))
template_dir = os.path.join(base_dir, 'templates')
static_dir = os.path.join(base_dir, 'static')

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_msg = data.get('message', '').lower()
    
    # Simulate processing delay to feel like real AI thinking
    time.sleep(1)
    
    response = "I am the Axon Systems AI Assistant. How can we help revolutionise your business today?"
    
    # Simulated smart rule-based logic
    if re.search(r'\b(?:price|cost|pricing|money|budget|fee)\b', user_msg):
        response = "Our project quotes are tailored to your exact needs. We focus on premium, scalable solutions that generate ROI. Could you provide some details about what you're looking to build so our engineering team can estimate?"
    elif re.search(r'\b(?:services|do|offer|build|make|portfolio)\b', user_msg):
        response = "We build cutting-edge web applications, autonomous AI agents, and custom enterprise automations. The Fiery 'Red Axon' design you're seeing is just a taste of our premium pixel-perfect engineering."
    elif re.search(r'\b(?:contact|email|phone|call|hire|location|where)\b', user_msg):
        response = "You can reach us at hello@axonsystems.com. We are proudly based in Karachi, PK, serving clients globally. The map at the bottom of the page shows our operational hub. Ready to book a meeting?"
    elif re.search(r'\b(?:hi|hello|hey|greetings|start)\b', user_msg):
        response = "Hello! Welcome to Axon Systems. I am your intelligent assistant. How can we help you step 'out of the box' today?"
    elif re.search(r'\b(?:who|what|axon|agency|theme|red)\b', user_msg):
        response = "Axon Systems is a premium tech agency specializing in AI orchestration and disruptive front-end design. Our mission is to capture attention and automate the rest."

    return jsonify({"reply": response})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
