import express from 'express';
import { ObjectID } from 'mongodb';
import ImageDatabase from '../../database/file/image.database';
import Image from '../../interface/object/image';
import APIService from '../../services/api.service';

const router: express.Router = express.Router();

router.get('/image/:id', async (req: express.Request, res: express.Response) => {
    const imageDatabase: ImageDatabase = new ImageDatabase();

    try {
        APIService.processingOnAPIOfDataModels({ req, res, method: imageDatabase.get(new ObjectID(req.params.id)), dataError: null });
    } catch (error) {
        APIService.catchError({ res, req, error, dataError: null });
    }
});

export default router;