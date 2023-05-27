const { CosmosClient } = require("@azure/cosmos");

// Azure Cosmos DB接続設定
const endpoint = "https://kind-action-database.documents.azure.com:443/";
const key = "gImJks25uqTKp9P0qhESjxTv1izeCwyX8Gj9Nk7xQZC5MalPtNAB4rxDZFORGvZnqLOz08T1P1r8ACDb7vaQPw==";

// データベースとコンテナの設定
const databaseId = "kind-action-database";
const containerId = "book";

// async function main() {
//   // CosmosClientの作成
//   const client = new CosmosClient({ endpoint, key });

//   const { database } = await client.databases.createIfNotExists({ id: databaseId });
//   const { container } = await database.containers.createIfNotExists({ id: containerId });

//   // データの作成
//   const newItem = {
//     id: "item1",
//     name: "Sample Item",
//     category: "Sample Category"
//   };
//   const { resource: createdItem } = await container.items.create(newItem);
//   console.log(`Created item with id ${createdItem.id}`);

//   // データの読み取り
//   const { resource: readItem } = await container.item(newItem.id).read();
//   console.log(`Read item with id ${readItem.id}`);

//   // データの更新
//   const updatedItem = {...readItem, category: "Updated Category"};
//   const { resource: replacedItem } = await container.item(updatedItem.id).replace(updatedItem);
//   console.log(`Updated item with id ${replacedItem.id}`);

//   // データの削除
//   await container.item(replacedItem.id).delete();
//   console.log(`Deleted item with id ${replacedItem.id}`);
// }

// main().catch((error) => {
//   console.error(error);
// });

async function main() {
  // CosmosClientの作成
  const client = new CosmosClient({ endpoint, key });

  const { database } = await client.databases.createIfNotExists({ id: databaseId });
  const { container } = await database.containers.createIfNotExists({ id: containerId });

  // 書籍の作成
  const newBook = {
    id: "book1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Classic"
  };
  const { resource: createdBook } = await container.items.create(newBook);
  console.log(`Created book with id ${createdBook.id}`);

  // 書籍の読み取り
  const { resource: readBook } = await container.item(newBook.id).read();
  console.log(`Read book with id ${readBook.id}`);

  // 書籍の更新
  const updatedBook = {...readBook, category: "Novel"};
  const { resource: replacedBook } = await container.item(updatedBook.id).replace(updatedBook);
  console.log(`Updated book with id ${replacedBook.id}`);

  // 書籍の削除
  await container.item(replacedBook.id).delete();
  console.log(`Deleted book with id ${replacedBook.id}`);
}

main().catch((error) => {
  console.error(error);
});

