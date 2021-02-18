import express from 'express';
import http from 'http';
import cors from 'cors';

import api from './api/api';
import LogWithoutDatabaseService from './services/server-info/log/log_without_database.service';

const app: express.Application = express();
const port: string | number = process.env.PORT || 8080;

app.use(cors());

app.use('/api', api);

const server: http.Server = http.createServer(app);
server.listen(port, () => {
    /* tslint:disable */
    console.log(`Server is starting: ${port}`);
    /* tslint:enable */

    const logWithoutDatabaseService: LogWithoutDatabaseService = new LogWithoutDatabaseService();
    logWithoutDatabaseService.logInfo({ message: `Server is starting: ${port}` });
});