import { MongoClient, ObjectID } from 'mongodb';

import { mongodbUrl } from './database_info';

export default abstract class Database<T> {
    protected database: string;
    protected collection: string;

    constructor(info: { database: string, collection: string }) {
        this.database = info.database;
        this.collection = info.collection;
    }

    protected static async connect() {
        return await MongoClient.connect(mongodbUrl, { useNewUrlParser: true });
    }

    protected create(info: any): Promise<T | null> {
        return new Promise<T | null>((resolve, reject) => {
            Database.connect().then(client => {
                info.dateOfCreation = new Date(new Date().toISOString());
                return client;
            }).then(client => {
                client.db(this.database).collection(this.collection).insertOne(info, (error: any, data: any) => {
                    if (!error) resolve(data.ops[0] ?? null);
                    else reject(error);
                });

                client.close();
            }).catch(error => {
                resolve(null);
                reject(error);
            });
        });
    }
}