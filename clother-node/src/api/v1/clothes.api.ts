import express from 'express';
import bodyParser from 'body-parser';
import APIService from '../../services/api.service';
import ClothesService from '../../services/clothes/clothes.service';
import { ObjectID } from 'mongodb';

const router: express.Router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.get('/clothes/:id', async (req: express.Request, res: express.Response) => {
    const clothesService: ClothesService = new ClothesService();
    APIService.processingOnAPIOfDataModels({ req, res, method: clothesService.get(new ObjectID(req.params.id)), dataError: null});
});

router.post('/clothes', async (req: express.Request, res: express.Response) => {
    if (!req.body) return res.sendStatus(400);

    const clothesService: ClothesService = new ClothesService();
    APIService.processingOnAPIOfDataModels({ req, res, method: clothesService.create(req.body), dataError: null});
});

export default router;