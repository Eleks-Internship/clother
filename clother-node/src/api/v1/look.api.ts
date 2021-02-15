import express from 'express';
import bodyParser from 'body-parser';
import APIService from '../../services/api.service';
import LookService from '../../services/look/look.service';
import LikeForLookService from '../../services/look/like_for_look.service';
import { ObjectID } from 'mongodb';
import LoginService from '../../services/auth/login.service';

const router: express.Router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.get('/looks', (req: express.Request, res: express.Response) => {
    const lookService: LookService = new LookService();

    try {
        APIService.processingOnAPIOfDataModels({ req, res, method: lookService.getList(), dataError: [] });
    } catch(error) {
        APIService.catchError({ req, res, error, dataError: [] });
    }
});

router.post('/looks/:id/like', async (req: express.Request, res: express.Response) => {
    const likeForLookService: LikeForLookService = new LikeForLookService();

    const loginService: LoginService = new LoginService();
    const userID: ObjectID | null = await loginService.getIdOfUserLogin({ token: req.headers.authorization });

    if (!userID) {
        return res.status(401).json({ data: null });
    }

    try {
        APIService.processingOnAPIOfDataModels({ req, res, method: likeForLookService.create({ look: { _id: new ObjectID(req.params.id) }, user: { _id: new ObjectID() } }), dataError: null });
    } catch(error) {
        APIService.catchError({ req, res, error, dataError: null });
    }
});

router.get('/looks/:id/like', async (req: express.Request, res: express.Response) => {
    const likeForLookService: LikeForLookService = new LikeForLookService();

    try {
        APIService.processingOnAPIOfDataModels({ req, res, method: likeForLookService.getListByLook({ look: { _id: new ObjectID(req.params.id) } }), dataError: [] });
    } catch(error) {
        APIService.catchError({ req, res, error, dataError: [] });
    }
});

router.post('/looks', async (req: express.Request, res: express.Response) => {
    const lookService: LookService = new LookService();

    const clothesList: { _id: ObjectID }[] = await Promise.all<{ _id: ObjectID }>((req.body.clothes).map((clothes: { _id: string } | { _id: ObjectID }) => {
        clothes._id = new ObjectID(clothes._id);
        return Promise.resolve(clothes);
    }));

    try {
        APIService.processingOnAPIOfDataModels({ req, res, method: lookService.create({ name: req.body.name, clothes: clothesList, user: { _id: new ObjectID(req.body.user._id) } }), dataError: null });
    } catch(error) {
        APIService.catchError({ req, res, error, dataError: null });
    }
});

router.put('/looks', async (req: express.Request, res: express.Response) => {
    const lookService: LookService = new LookService();

    const clothesList: { _id: ObjectID }[] = await Promise.all<{ _id: ObjectID }>((req.body.clothes).map((clothes: { _id: string } | { _id: ObjectID }) => {
        clothes._id = new ObjectID(clothes._id);
        return Promise.resolve(clothes);
    }));

    try {
        APIService.processingOnAPIOfDataModels({ req, res, method: lookService.update({ _id: new ObjectID(req.body.id), data: { name: req.body.name, clothes: clothesList } }), dataError: null });
    } catch(error) {
        APIService.catchError({ req, res, error, dataError: null });
    }
})

export default router;