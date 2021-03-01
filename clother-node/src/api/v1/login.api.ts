import express from 'express';
import LoginService from '../../services/auth/login.service';
import APIService from '../../services/api.service';
import { ObjectID } from 'mongodb';
import UserService from '../../services/user/user.service';

const router: express.Router = express.Router();

router.get('/login', async (req: express.Request, res: express.Response) => {
    const loginService: LoginService = new LoginService();
    const userService: UserService =  new UserService();

    const userID: ObjectID | null = await loginService.getIdOfUserLogin({ token: req.headers.authorization });

    if (!userID) {
        return res.status(401).json({ data: null });
    }

    try {
        APIService.processingOnAPIOfDataModels({req, res, method: userService.get(userID), dataError: null});
    } catch (error) {
        APIService.catchError({res, req, error, dataError: null});
    }
});

router.post('/login', (req: express.Request, res: express.Response) => {
    const loginService: LoginService = new LoginService();

    try {
        APIService.processingOnAPIOfDataModels({req, res, method: loginService.getToken(req.body), dataError: ''});
    } catch (error) {
        APIService.catchError({res, req, error, dataError: ''});
    }
});

router.post('/login/facebook', (req: express.Request, res: express.Response) => {
    const loginService: LoginService = new LoginService();

    try {
        APIService.processingOnAPIOfDataModels({req, res, method: loginService.getTokenBySocialMedia(req.body), dataError: ''});
    } catch(error) {
        APIService.catchError(error);
    }
});

router.post('/login/google', (req: express.Request, res: express.Response) => {
    const loginService: LoginService = new LoginService();

    try {
        APIService.processingOnAPIOfDataModels({req, res, method: loginService.getTokenBySocialMedia(req.body), dataError: ''});
    } catch(error) {
        APIService.catchError(error);
    }
});

export default router;