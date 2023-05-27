from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from azure.cosmos import CosmosClient
import os

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['GET'])
@cross_origin()
def get_books():
    # Azure Cosmos DB接続設定
    url = "https://kind-action-database.documents.azure.com:443/"
    key = "gImJks25uqTKp9P0qhESjxTv1izeCwyX8Gj9Nk7xQZC5MalPtNAB4rxDZFORGvZnqLOz08T1P1r8ACDb7vaQPw=="

    # データベースとコンテナの設定
    database_name = "kind-action-database"
    container_name = "book"

    client = CosmosClient(url, credential=key)
    database = client.get_database_client(database_name)
    container = database.get_container_client(container_name)

    # データベースのすべてのドキュメントを取得
    items = list(container.read_all_items(max_item_count=10))

    return jsonify(items)

# @app.route('/', methods=['GET'])
# def home():
#     return "Hello, this is the home page!"

@app.route('/add', methods=['POST'])
@cross_origin()
def add_book():
    # Azure Cosmos DB接続設定
    url = "https://kind-action-database.documents.azure.com:443/"
    key = "gImJks25uqTKp9P0qhESjxTv1izeCwyX8Gj9Nk7xQZC5MalPtNAB4rxDZFORGvZnqLOz08T1P1r8ACDb7vaQPw=="

    # データベースとコンテナの設定
    database_name = "kind-action-database"
    container_name = "post"

    client = CosmosClient(url, credential=key)
    database = client.get_database_client(database_name)
    container = database.get_container_client(container_name)

    # リクエストからデータを取得
    data = request.get_json()

    # 新しい本を追加
    container.upsert_item(data)

    return jsonify({"message": "Book added successfully"})

if __name__ == "__main__":
    app.run(port=5500)

