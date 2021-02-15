import express from 'express';

import clothesAPI from './clothes.api';
import likeAPI from './like.api';
import loginAPI from './login.api';
import lookAPI from './look.api';
import userAPI from './user.api';

const router: express.Router = express.Router();

router.use('/', clothesAPI);
router.use('/', likeAPI);
router.use('/', loginAPI);
router.use('/', lookAPI);
router.use('/', userAPI);

export default router;