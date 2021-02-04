import { MongoClient, ObjectID } from 'mongodb';
import LogWithoutDatabaseService from '../services/server-info/log/log_without_database.service';

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
                client.db(this.database).collection(this.collection).insertOne(info, (error: object, data: any) => {
                    resolve(data.ops[0] ?? null);

                    if (error) {
                        const logWithoutDatabaseService: LogWithoutDatabaseService = new LogWithoutDatabaseService();
                        logWithoutDatabaseService.logError({ message: error });

                        reject(error);
                    }
                });

                client.close();
            }).catch(error => {
                const logWithoutDatabaseService: LogWithoutDatabaseService = new LogWithoutDatabaseService();
                logWithoutDatabaseService.logError({ message: error });

                resolve(null);
                reject(error);
            });
        });
    }

    protected get(_id: ObjectID): Promise<T | null> {
        return new Promise<T | null>((resolve, reject) => {
            Database.connect().then(client => {
                client.db(this.database).collection(this.collection).findOne({
                    _id
                }, (error: object, data: any) => {
                    resolve(data ?? null);

                    if (error) {
                        const logWithoutDatabaseService: LogWithoutDatabaseService = new LogWithoutDatabaseService();
                        logWithoutDatabaseService.logError({ message: error });

                        reject(error);
                    }
                });

                client.close();
            }).catch(error => {
                const logWithoutDatabaseService: LogWithoutDatabaseService = new LogWithoutDatabaseService();
                logWithoutDatabaseService.logError({ message: error });

                resolve(null);
                reject(error);
            });
        });
    }

    protected update(info: { _id: ObjectID, data: any}): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            Database.connect().then(client => {
                client.db(this.database).collection(this.collection).findOneAndUpdate({
                    _id: info._id
                }, {'$set': info.data}, (error: object, data: any) => {
                    resolve(data ? true : false);

                    if (error) {
                        const logWithoutDatabaseService: LogWithoutDatabaseService = new LogWithoutDatabaseService();
                        logWithoutDatabaseService.logError({ message: error });

                        reject(error);
                    }
                });

                client.close();
            }).catch(error => {
                const logWithoutDatabaseService: LogWithoutDatabaseService = new LogWithoutDatabaseService();
                logWithoutDatabaseService.logError({ message: error });

                resolve(false);
                reject(error);
            });
        });
    }

    protected delete(_id: ObjectID): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            Database.connect().then(client => {
                client.db(this.database).collection(this.collection).deleteOne({
                    _id
                }, (error: object, data: any) => {
                    resolve(data ? true : false);

                    if (error) {
                        const logWithoutDatabaseService: LogWithoutDatabaseService = new LogWithoutDatabaseService();
                        logWithoutDatabaseService.logError({ message: error });

                        reject(error);
                    }
                });

                client.close();
            }).catch(error => {
                const logWithoutDatabaseService: LogWithoutDatabaseService = new LogWithoutDatabaseService();
                logWithoutDatabaseService.logError({ message: error });

                resolve(false);
                reject(error);
            });
        });
    }
}