from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson import ObjectId
from flask_cors import CORS
from pymongo import MongoClient
import json

app = Flask(__name__)
CORS(app)
client = MongoClient('mongodb://localhost:27017')
db = client['live_sitter']  # Replace 'live_sitter' with your actual database name
overlays_collection = db['overlays']  # Use the correct collection name

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/overlays', methods=['POST'])
def create_overlay():
    overlay_data = request.json
    overlay_id = overlays_collection.insert_one(overlay_data).inserted_id
    return jsonify({'_id': str(overlay_id)})

@app.route('/overlays', methods=['GET'])
def get_overlays():
    try:
        overlays = list(overlays_collection.find())
        
        # Convert ObjectId to string for _id and handle nested structures
        overlays_str = json.dumps(overlays, default=lambda x: str(x) if isinstance(x, ObjectId) else x)
        
        return overlays_str
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/overlays/<string:overlay_id>', methods=['PUT'])
def update_overlay(overlay_id):
    try:
        overlay_data = request.json
        overlays_collection.update_one({'_id': ObjectId(overlay_id)}, {'$set': overlay_data})
        return jsonify({'message': 'Overlay updated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/overlays/<string:overlay_id>', methods=['DELETE'])
def delete_overlay(overlay_id):
    try:
        overlays_collection.delete_one({'_id': ObjectId(overlay_id)})
        return jsonify({'message': 'Overlay deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
