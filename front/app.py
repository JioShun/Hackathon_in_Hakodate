from flask import Flask, render_template, request
from azure.cosmos import exceptions, CosmosClient, PartitionKey


app = Flask(__name__)

# Azure Cosmos DB接続設定
url = "https://kind-action-database.documents.azure.com:443/"
key = "gImJks25uqTKp9P0qhESjxTv1izeCwyX8Gj9Nk7xQZC5MalPtNAB4rxDZFORGvZnqLOz08T1P1r8ACDb7vaQPw=="

# データベースとコンテナの設定
database_name = "kind-action-database"
container_name = "book"

client = CosmosClient(url, key)
database = client.get_database_client(database_name)
container = database.get_container_client(container_name)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/submit', methods=['POST'])
def submit():
    title = request.form['title-input']
    kind = request.form['kind-input']
    date = request.form['date-input']
    text = request.form['text-input']

    database = client.get_database_client(database_name)
    container = database.get_container_client(container_name)

    item = {'id': '3', 'title': title, 'kind': kind, 'date': date, 'text': text}
    container.upsert_item(item)
    
    return render_template('index.html')




if __name__ == "__main__":
    app.run()