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
    if (!req.body) return res.status(400).send({ data: null, message: 'user did not enter data in the form' });

    const clothesService: ClothesService = new ClothesService();
    APIService.processingOnAPIOfDataModels({ req, res, method: clothesService.create(req.body), dataError: null});
});

router.put('/clothes', async (req: express.Request, res: express.Response) => {
    if (!req.body) return res.status(400).send({ data: null, message: 'user did not enter data in the form' });

    const clothesService: ClothesService = new ClothesService();
    APIService.processingOnAPIOfDataModels({ req, res, method: clothesService.update({ _id: new ObjectID(req.body.id), data: { name: req.body.name, photoName: req.body.photoName, urlForBuy: req.body.urlForBuy } }), dataError: null});
});

export default router;