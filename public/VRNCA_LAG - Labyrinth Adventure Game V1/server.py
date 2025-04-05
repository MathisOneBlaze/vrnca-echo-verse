from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuration du logging
logging.basicConfig(
    filename='server.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

@app.route('/log', methods=['POST'])
def log_message():
    data = request.json
    message = data.get('message', '')
    level = data.get('level', 'info')
    
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    log_message = f"[{timestamp}] {message}"
    
    if level.lower() == 'error':
        logging.error(log_message)
    else:
        logging.info(log_message)
    
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True, port=5000) 