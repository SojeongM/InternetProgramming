from flask import Flask, jsonify
from pymongo import MongoClient
from bson import json_util
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
client = MongoClient('localhost', 27017)  # MongoDB 기본 포트는 27017
db = client.medal  # 여기에 실제 사용하는 데이터베이스 이름을 넣어주세요
collection = db.country

# API 엔드포인트
@app.route('/medal', methods=['GET'])
def get_data():
    data = list(collection.find({}, {'_id': 0}))  # 데이터베이스에서 모든 문서를 가져오기
    return json_util.dumps(data, ensure_ascii=False)
if __name__ == '__main__':
    app.run(debug=True)
