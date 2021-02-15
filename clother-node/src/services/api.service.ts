import express from 'express';

import LogWithDatabaseService from './server-info/log/log_with_database.service';
import LogWithoutDatabaseService from './server-info/log/log_without_database.service';
export default class APIService {
    public static processingOnAPIOfDataModels(info: { req: express.Request, res: express.Response, method: Promise<any>, dataError: any }): void {
        const logWithoutDatabaseService: LogWithoutDatabaseService = new LogWithoutDatabaseService();
        logWithoutDatabaseService.logInfo({ message: "Request: " + info.req.url });

        info.method.catch(error => {
            info.res.status(500).send({ data: info.dataError });
        }).then(data => {
            info.res.status(200).json({ data });
        });
    }

    public static catchError(info: {res: express.Response, req: express.Request, error: object, dataError: any}): void {
        const logWithDatabaseService: LogWithDatabaseService = new LogWithDatabaseService();
        logWithDatabaseService.logError({ message: info.error });

        info.res.status(500).json({ data: null, message: info.error.toString() });
    }
}