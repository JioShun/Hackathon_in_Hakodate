const express = require('express');
const { CosmosClient } = require("@azure/cosmos");

// Azure Cosmos DB接続設定
const endpoint = "https://kind-action-database.documents.azure.com:443/";
const key = "gImJks25uqTKp9P0qhESjxTv1izeCwyX8Gj9Nk7xQZC5MalPtNAB4rxDZFORGvZnqLOz08T1P1r8ACDb7vaQPw==";

// データベースとコンテナの設定
const databaseId = "kind-action-database";
const containerId = "book";

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


app.get('/books', async (req, res) => {
    // CosmosClientの作成
    const client = new CosmosClient({ endpoint, key });

    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({ id: containerId });

    // データベースのすべてのドキュメントを取得
    const { resources: books } = await container.items.query("SELECT * FROM c").fetchAll();

    res.send(books);
});


const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Server started on port ${port}`));
