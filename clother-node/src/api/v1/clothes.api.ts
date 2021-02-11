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

    try {
        APIService.processingOnAPIOfDataModels({ req, res, method: clothesService.get(new ObjectID(req.params.id)), dataError: null });
    } catch (error) {
        APIService.catchError({ res, req, error, dataError: null });
    }
});

router.post('/clothes', async (req: express.Request, res: express.Response) => {
    if (!req.body) return res.status(400).send({ data: null, message: 'user did not enter data in the form' });

    const clothesService: ClothesService = new ClothesService();

    try {
        APIService.processingOnAPIOfDataModels({ req, res, method: clothesService.create({ name: req.body.name, photoName: req.body.photoName, urlForBuy: req.body.urlForBuy, user: { _id: new ObjectID(req.body.user._id) }}), dataError: null });
    } catch (error) {
        APIService.catchError({ res, req, error, dataError: null });
    }
});

router.put('/clothes', async (req: express.Request, res: express.Response) => {
    if (!req.body) return res.status(400).send({ data: null, message: 'user did not enter data in the form' });

    const clothesService: ClothesService = new ClothesService();

    try {
        APIService.processingOnAPIOfDataModels({ req, res, method: clothesService.update({ _id: new ObjectID(req.body.id), data: { name: req.body.name, photoName: req.body.photoName, urlForBuy: req.body.urlForBuy } }), dataError: false });
    } catch (error) {
        APIService.catchError({ res, req, error, dataError: false });
    }
});

router.delete('/clothes/:id', async (req: express.Request, res: express.Response) => {
    const clothesService: ClothesService = new ClothesService();

    try {
        APIService.processingOnAPIOfDataModels({ req, res, method: clothesService.delete(new ObjectID(req.params.id)), dataError: false });
    } catch (error) {
        APIService.catchError({ res, req, error, dataError: null });
    }
});

export default router;