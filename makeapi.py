from flask import Flask, jsonify
from pymongo import MongoClient
from bson import json_util
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
client = MongoClient('localhost', 27017)  
db = client.medal  
collection = db.country

# API 엔드포인트
@app.route('/medal', methods=['GET'])
def get_data():
    data = list(collection.find({}, {'_id': 0}))  
    return json_util.dumps(data, ensure_ascii=False)
if __name__ == '__main__':
    app.run(debug=True)
