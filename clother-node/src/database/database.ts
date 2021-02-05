import { MongoClient } from 'mongodb';

import { mongodbUrl } from './database_info';

export default abstract class Database {
    protected static async connect(): Promise<MongoClient> {
        return await MongoClient.connect(mongodbUrl, { useNewUrlParser: true });
    }
}