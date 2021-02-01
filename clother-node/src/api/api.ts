import express from 'express';

import v1API from './v1/v1.api';

const router: express.Router = express.Router();

router.use('/v1', v1API);

export default router;