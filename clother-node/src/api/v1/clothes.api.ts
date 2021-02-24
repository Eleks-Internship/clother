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

router.post('/clothes', upload.single('image'), async (req: express.Request, res: express.Response) => {
    if (!req.body) return res.status(400).send({ data: null, message: 'user did not enter data in the form' });

    // const pipe = util.promisify(pipeline);

    // const bucket = new mongodb.GridFSBucket(db, {
    //     chunkSizeBytes: 1024,
    //     bucketName: 'update'
    //   });
      
    //   fs.createReadStream('./' + req.file.filename).
    //     pipe(bucket.openUploadStream(req.file.filename).
    //     on('error', function(error: any) {
    //       assert.ifError(error);
    //     }).
    //     on('finish', function() {
    //       console.log('done!');
    //       process.exit(0);
    //     });

    // const photoOfClothesDatabase: PhotoOfClothesDatabase = new PhotoOfClothesDatabase();

    // const pass: PassThrough = await photoOfClothesDatabase.get({ filename: req.file.filename });
    // const writable: Writable = new Writable();

    // pass.pipe(writable);
    // console.log(writable);

    // pass.pipe(writable);
    // pass.unpipe(writable);

    // pass.on('data', (chunk) => { console.log(chunk.toString()); });
    // pass.write('ok');  // Will not emit 'data'.
    // pass.resume();


    

    // if (!req.file) {
    //     const error = new Error('No File');
    //     return res.send(error);
    // }

    // const form = new FormData();
    // const buffer = fs.createReadStream(req.file.path);

    // form.append('image', buffer, undefined);

    // fetch("https://flask-models-n6vwx54efa-uc.a.run.app/predict", {
    //     method: 'POST',
    //     body: JSON.stringify({ image: fs.createReadStream(req.file.path) }),
    //     headers: { 'Authorization': 'Basic YWxhZGRpbjpvcGVuc2VzYW1lljrhebgervwekbflisufbewyufewfsngsdbgrrldngsufigbeurgb' },
    // })
    // .then(response => response.json())
    // .then(json => res.json({ data: json }));








    // const file = req.file;

    // if (!file) {
    //     const error = new Error('No File');
    //     return res.send(error);
    // }

    // const form = new FormData();
    // const buffer = fs.createReadStream(file.path);

    // form.append('image', buffer, {
    //     contentType: 'text/plain',
    //     filename: file.originalname,
    // });

    // fetch("https://flask-models-n6vwx54efa-uc.a.run.app/predict", {
    //     method: 'POST',
    //     body: form,
    //     headers: { 'Authorization': 'Basic YWxhZGRpbjpvcGVuc2VzYW1lljrhebgervwekbflisufbewyufewfsngsdbgrrldngsufigbeurgb' },
    // })
    // .then(response => response.json())
    // .then(json => res.json({ data: json }));









    const photoOfClothesDatabase: PhotoOfClothesDatabase = new PhotoOfClothesDatabase();
    let infoOfClothes: { label: string, probability: string }[] = [];

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
                const clothesService: ClothesService = new ClothesService();

                try {
                    APIService.processingOnAPIOfDataModels({ req, res, method: clothesService.create({ name: req.body.name, photoName: req.file.filename, urlForBuy: req.body.urlForBuy, infoOfClothes: json.predictions, user: { _id: new ObjectID(req.body.user._id) }}), dataError: null });
                } catch (error) {
                    APIService.catchError({ res, req, error, dataError: null });
                }
            });
        }
    });
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