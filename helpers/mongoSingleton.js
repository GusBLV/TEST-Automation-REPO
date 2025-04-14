const {MongoClient} = require('mongodb');

class MongoSingleton {


    constructor() {
        if (!MongoSingleton.instance) {
            this.client = new MongoClient("mongodb://localhost:27017", {useNewUrlParser: true});
            this.db = null;
            MongoSingleton.instance = this;
        }

        return MongoSingleton.instance;

    }

    async connect() {
        if (!this.db) {
            this.db = await this.client.connect();
            this.db = this.client.db("test");