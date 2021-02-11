import express from 'express';

import clothesAPI from './clothes.api';
import loginAPI from './login.api';
import userAPI from './user.api';

const router: express.Router = express.Router();

router.use('/', clothesAPI);
router.use('/', loginAPI);
router.use('/', userAPI);

export default router;