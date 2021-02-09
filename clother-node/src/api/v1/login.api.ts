import express from 'express';
import LoginService from '../../services/auth/login.service';
import APIService from '../../services/api.service';

const router: express.Router = express.Router();

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