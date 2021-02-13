import Database from "../database";
import LogWithoutDatabaseService from '../../services/server-info/log/log_with_database.service';

import { dbClothes, dbServerInfo, dbUser } from '../database_info';

export default class CollectionDatabase extends Database {

    constructor() {
        super();
    }

    public static deleteClothes(): Promise<boolean> {
        return CollectionDatabase.delete({ database: dbClothes, collection: 'clothes-test'});
    }

    public static deleteError(): Promise<boolean> {
        return CollectionDatabase.delete({ database: dbServerInfo, collection: 'error-test'});
    }

    public static deleteUser(): Promise<boolean> {
        return CollectionDatabase.delete({ database: dbUser, collection: 'user-test'});
    }

    public static deleteLook(): Promise<boolean> {
        return CollectionDatabase.delete({ database: dbClothes, collection: 'look-test'});
    }

    private static delete(info: { database: string, collection: string }): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            Database.connect().then(client => {
                return client.db(info.database).collection(info.collection).remove((error: any, delOK: any) => {
                    if (error) {
                        const logWithoutDatabaseService: LogWithoutDatabaseService = new LogWithoutDatabaseService();
                        logWithoutDatabaseService.logError({ message: error });

                        resolve(false);
                        reject(error);
                    }

                    resolve(!!delOK);

                    client.close();
                });
            }).catch(error => {
                const logWithoutDatabaseService: LogWithoutDatabaseService = new LogWithoutDatabaseService();
                logWithoutDatabaseService.logError({ message: error });

                resolve(false);
                reject(error);
            });
        });
    }
}