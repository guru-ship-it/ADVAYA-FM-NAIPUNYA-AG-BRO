import sys
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

# Add root directory to path to import translator_bridge
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from gemma_translator.translator_bridge import GemmaTranslator

app = Flask(__name__)
CORS(app)

translator = GemmaTranslator()

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "Online", "model": "Gemma 4B (Pragati's Tongue)"})

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    text = data.get('text', '')
    target = data.get('target', 'Hindi')
    
    if not text:
        return jsonify({"error": "No text provided"}), 400
        
    translated_text = translator.translate(text, target)
    return jsonify({
        "original": text,
        "translated": translated_text,
        "engine": "Gemma 4B"
    })

if __name__ == '__main__':
    # Running on 5000 by default
    app.run(host='0.0.0.0', port=5000, debug=False)
