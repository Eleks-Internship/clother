import express from 'express';
import bodyParser from 'body-parser';
import APIService from '../../services/api.service';
import LoginService from '../../services/auth/login.service';
import UserService from '../../services/user/user.service';
import { ObjectID } from 'mongodb';

const router: express.Router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/users', (req: express.Request, res: express.Response) => {
    if (!req.body) return res.status(400).send({ data: null, message: 'user did not enter data in the form' });

    const loginService: LoginService = new LoginService();

    try {
        APIService.processingOnAPIOfDataModels({ req, res, method: loginService.getTokenAfterCreateUser(req.body), dataError: null });
    } catch (error) {
        APIService.catchError({ res, req, error, dataError: null });
    }
});

router.get('/users/:id', (req: express.Request, res: express.Response) => {
    const userService: UserService = new UserService();

    try {
        APIService.processingOnAPIOfDataModels({ req, res, method: userService.get(new ObjectID(req.params.id)), dataError: null });
    } catch (error) {
        APIService.catchError({ res, req, error, dataError: null });
    }
});

export default router;