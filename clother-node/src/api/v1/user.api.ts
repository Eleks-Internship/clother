import express from 'express';
import bodyParser from 'body-parser';
import APIService from '../../services/api.service';
import UserService from '../../services/user/user.service';

const router: express.Router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/users', (req: express.Request, res: express.Response) => {
    if (!req.body) return res.status(400).send({ data: null, message: 'user did not enter data in the form' });

    const userService: UserService = new UserService();

    try {
        APIService.processingOnAPIOfDataModels({ req, res, method: userService.create(req.body), dataError: null });
    } catch (error) {
        APIService.catchError({ res, req, error, dataError: null });
    }
});

export default router;