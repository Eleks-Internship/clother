import express from 'express';

export default class APIService {
    public static processingOnAPIOfDataModels(info: { req: express.Request, res: express.Response, method: Promise<any>, dataError: any }): void {
        info.method.catch(() => {
            info.res.status(500).send({ data: info.dataError });
        }).then(data => {
            info.res.status(200).json({ data });
        });
    }
}