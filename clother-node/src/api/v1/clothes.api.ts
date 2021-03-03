import express from 'express';
import multer from 'multer';
import fs from 'fs';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import APIService from '../../services/api.service';
import ClothesService from '../../services/clothes/clothes.service';
import { ObjectID } from 'mongodb';
import PhotoOfClothesDatabase from '../../database/file/photo_of_clothes.database';
import FormData from 'form-data';
import Clothes from '../../interface/object/clothes';
import LogWithDatabaseService from '../../services/server-info/log/log_without_database.service';
import LoginService from '../../services/auth/login.service';
const request = require('request');

const router: express.Router = express.Router();

const photoOfClothesDatabase: PhotoOfClothesDatabase = new PhotoOfClothesDatabase();
const upload: any = multer({ storage: photoOfClothesDatabase.save() });

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

router.get('/clothes/:id/image', async (req: express.Request, res: express.Response) => {
    const clothesService: ClothesService = new ClothesService();

    try {
        const clothes: Clothes | null = await clothesService.get(new ObjectID(req.params.id));

        if (clothes) (await photoOfClothesDatabase.getFile({ filename: clothes?.photoName })).pipe(res);
    } catch(error) {
        const logWithDatabaseService: LogWithDatabaseService = new LogWithDatabaseService();
        logWithDatabaseService.logError({ message: error });
    }
});

router.post('/clothes', upload.single('image'), async (req: express.Request, res: express.Response) => {
    if (!req.body) return res.status(400).send({ data: null, message: 'user did not enter data in the form' });

    if (!req.file) {
        return res.status(500).json({ data: null, message: 'no file' });
    }

    const loginService: LoginService = new LoginService();
    const userID: ObjectID | null = await loginService.getIdOfUserLogin({ token: req.headers.authorization });

    if (!userID) {
        return res.status(401).json({ data: null });
    }

    photoOfClothesDatabase.downoladFile({ filename: req.file.filename }).then(access => {
        if (access) {
            const form = new FormData();
            const buffer = fs.createReadStream(`image/recommendation/${req.file.filename}`);

            form.append('image', buffer, {
                contentType: 'text/plain',
                filename: req.file.originalname,
            });

            fetch("https://flask-models-n6vwx54efa-uc.a.run.app/predict", {
                method: 'POST',
                body: form,
                headers: { 'Authorization': 'Basic YWxhZGRpbjpvcGVuc2VzYW1lljrhebgervwekbflisufbewyufewfsngsdbgrrldngsufigbeurgb' },
            })
            .then(response => response.json())
            .then(json => {
                fs.unlinkSync(`image/recommendation/${req.file.filename}`);

                const clothesService: ClothesService = new ClothesService();

                try {
                    APIService.processingOnAPIOfDataModels({ req, res, method: clothesService.create({ name: req.body.name, photoName: req.file.filename, urlForBuy: req.body.urlForBuy, infoOfClothes: json, user: { _id: userID }}), dataError: null });
                } catch (error) {
                    APIService.catchError({ res, req, error, dataError: null });
                }
            }).catch(error => {
                APIService.catchError({ res, req, error, dataError: null });
            });
        }
    });
});

router.post('/clothes/:id/recommendations', async (req: express.Request, res: express.Response) => {
    if (!req.body) return res.status(400).send({ data: null, message: 'user did not enter data in the form' });

    const clothesService: ClothesService = new ClothesService();
    let clothes: Clothes | null = null;
    try {
        clothes = await clothesService.get(new ObjectID(req.params.id));
    } catch (error) {
        APIService.catchError({ res, req, error, dataError: false });
    }

    if (!clothes) return res.status(200).send({ data: [] });

    const headers = {
        "Authorization": "Basic YWxhZGRpbjpvcGVuc2VzYW1lljrhebgervwekbflisufbewyufewfsngsdbgrrldngsufigbeurgb",
        "DbName": "images",
        "CollName": "urlsave",
    };

    request.post({
        url: "https://flask-models-n6vwx54efa-uc.a.run.app/recommend",
        headers: headers,
        json: clothes.infoOfClothes,
    }, function optionalCallback(err: any, httpResponse: any, body: any, response: any) {
        if (err) {
            return console.error("upload failed:", err);
        }
        res.json({ data: body });
    });
});

router.put('/clothes', upload.single('image'), async (req: express.Request, res: express.Response) => {
    if (!req.body) return res.status(400).send({ data: null, message: 'user did not enter data in the form' });

    if (!req.file) {
        return res.status(500).json({ data: null, message: 'no file' });
    }

    photoOfClothesDatabase.downoladFile({ filename: req.file.filename }).then(access => {
        if (access) {
            const form = new FormData();
            const buffer = fs.createReadStream(`image/recommendation/${req.file.filename}`);

            form.append('image', buffer, {
                contentType: 'text/plain',
                filename: req.file.originalname,
            });

            fetch("https://flask-models-n6vwx54efa-uc.a.run.app/predict", {
                method: 'POST',
                body: form,
                headers: { 'Authorization': 'Basic YWxhZGRpbjpvcGVuc2VzYW1lljrhebgervwekbflisufbewyufewfsngsdbgrrldngsufigbeurgb' },
            })
            .then(response => response.json())
            .then(json => {
                fs.unlinkSync(`image/recommendation/${req.file.filename}`);

                const clothesService: ClothesService = new ClothesService();

                try {
                    APIService.processingOnAPIOfDataModels({ req, res, method: clothesService.update({ _id: new ObjectID(req.body.id), data: { name: req.body.name, photoName: req.file.filename, urlForBuy: req.body.urlForBuy, infoOfClothes: json.predictions, } }), dataError: false });
                } catch (error) {
                    APIService.catchError({ res, req, error, dataError: false });
                }
            }).catch(error => {
                APIService.catchError({ res, req, error, dataError: null });
            });
        }
    });
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