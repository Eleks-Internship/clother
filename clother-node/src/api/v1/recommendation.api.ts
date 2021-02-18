import express from 'express';
import fs from 'fs';
import multer from 'multer';
import request from 'request';
import fetch from 'node-fetch';
import FormData from 'form-data';

const router: express.Router = express.Router();

const storage = multer.diskStorage({
    destination: (req: express.Request, file: any, callBack: any) => {
        callBack(null, 'image/recommendation/')
    },
    filename: (req: express.Request, file: any, callBack: any) => {
        callBack(null, `FunOfHeuristic_${file.originalname}`)
    }
});

const upload = multer({ storage: storage });

router.post('/recommendations', upload.single('image'), (req: express.Request, res: express.Response) => {
    if (!req.body) return res.status(400).send({ data: null, message: 'user did not enter data in the form' });

    const file = req['file'];

    if (!file) {
        const error = new Error('No File');
        return res.send(error);
    }

    const form = new FormData();
    const buffer = fs.createReadStream(file.path);

    form.append('image', buffer, {
        contentType: 'text/plain',
        filename: file.originalname,
    });

    fetch("https://flask-models-n6vwx54efa-uc.a.run.app/predict", {
        method: 'POST',
        body: form,
        headers: { 'Authorization': 'Basic YWxhZGRpbjpvcGVuc2VzYW1lljrhebgervwekbflisufbewyufewfsngsdbgrrldngsufigbeurgb' },
    })
    .then(res => res.json())
    .then(json => res.json({ data: json }));
});

export default router;