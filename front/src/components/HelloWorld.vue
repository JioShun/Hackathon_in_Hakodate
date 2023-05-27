<template>
    <!-- <template v-for="item in items">
        <p>{{ item.id }}</p>
    </template> -->
    <p>aaaa</p>
    <li v-for="item in items" :key="item.id">
        <p>aaa</p>
        {{ item.id}}
    </li>
    

</template>

<script>
import { CosmosClient } from '@azure/cosmos';
import cosmosConfig from '../cosmosConfig.js';

export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            items : []
        }
    },
    methods: {
        async fetchData() {
            const { CosmosClient } = require("@azure/cosmos");

            const endpoint = "https://kind-action-database.documents.azure.com:443/";
            const key = "https://kind-action-database.documents.azure.com:443/";
            const databaseId = "kind-action-database";
            const containerId = "book";

            const client = new CosmosClient({ endpoint, key });
            const container = client.database(databaseId).container(containerId);

            const query = "SELECT * FROM c";
            const { resources: items } = await container.items.query(query).fetchAll();

            this.items = items;


        //     const client = new CosmosClient({
        //         endpoint: cosmosConfig.endpoint,
        //         key: cosmosConfig.key
        //     });


        // /* const { CosmosClient } = require("@azure/cosmos");
        //     const client = new CosmosClient({ endpoint, key }); 
        //     と同じ↓
        //     */
        //     const { resources: items } = await client.database(cosmosConfig.databaseId).container(cosmosConfig.containerId).items.query('SELECT * FROM c').fetchAll();

        //     this.items = items;
        },



        // async setData() {
        //     // //初期設定
        //     // const { CosmosClient } = require("@azure/cosmos");
        //     // const client = new CosmosClient({ endpoint, key });

        //     // const { database } = await client.databases.createIfNotExists({ id: databaseId });
        //     // const { container } = await database.containers.createIfNotExists({ id: containerId });

        //     // 書籍の作成
        //     const newBook = {
        //         id: "book1",
        //         title: "The Great Gatsby",
        //         author: "F. Scott Fitzgerald",
        //         category: "Classic"
        //     };

        //     const { resource: createdBook } = await container.items.create(newBook);
        //     console.log(`Created book with id ${createdBook.id}`);

        //     // 書籍の読み取り
        //     const { resource: readBook } = await container.item(newBook.id).read();
        //     console.log(`Read book with id ${readBook.id}`);

        //     // 書籍の更新
        //     const updatedBook = {...readBook, category: "Novel"};
        //     const { resource: replacedBook } = await container.item(updatedBook.id).replace(updatedBook);
        //     console.log(`Updated book with id ${replacedBook.id}`);

        //     // 書籍の削除
        //     await container.item(replacedBook.id).delete();
        //         console.log(`Deleted book with id ${replacedBook.id}`);
        // },
    },
    mounted() {
        this.fetchData();
    },
}
</script>
