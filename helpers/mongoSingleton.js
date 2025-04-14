const {MongoClient} = require('mongodb');

class MongoSingleton {


    constructor() {
        if (!MongoSingleton.instance) {
            this.client = new MongoClient("mongodb://192.168.0.3:27017", {useNewUrlParser: true});
            this.db = null;
            MongoSingleton.instance = this;
        }

        return MongoSingleton.instance;

    }

    async connect() {
        if (!this.db) {
            this.db = await this.client.connect();
            console.log("Connected to MongoSingleton");
            this.db = this.client.db("test");
        }
        return this.db;
    }

    getCollection(collectionName) {
        return this.db.collection(collectionName);
    }


}

const mongoInstance = new MongoSingleton();
module.exports = mongoInstance;