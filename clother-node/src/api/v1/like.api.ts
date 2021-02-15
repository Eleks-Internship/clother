import express from 'express';
import bodyParser from 'body-parser';
import APIService from '../../services/api.service';
import LikeForLookService from '../../services/look/like_for_look.service';
import { ObjectID } from 'mongodb';
import LoginService from '../../services/auth/login.service';

const router: express.Router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.get('/like', async (req: express.Request, res: express.Response) => {
    const likeForLookService: LikeForLookService = new LikeForLookService();

    const loginService: LoginService = new LoginService();
    const userID: ObjectID | null = await loginService.getIdOfUserLogin({ token: req.headers.authorization });

    if (!userID) {
        return res.status(401).json({ data: null });
    }

    try {
        APIService.processingOnAPIOfDataModels({ req, res, method: likeForLookService.getListByUser({ user: { _id: userID } }), dataError: [] });
    } catch(error) {
        APIService.catchError({ req, res, error, dataError: [] });
    }
});

export default router;