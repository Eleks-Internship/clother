import express from 'express';

import clothesAPI from './clothes.api';

const router: express.Router = express.Router();

router.use('/', clothesAPI);

export default router;