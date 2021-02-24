import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';

import api from './api/api';
import LogWithoutDatabaseService from './services/server-info/log/log_without_database.service';

const app: express.Application = express();
const port: string | number = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../clother-angular/dist/clother-angular')));

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', "true");

    next();
});

app.use('/api', api);

app.get('**', (req: express.Request, res: express.Response) => {
    res.status(200).sendFile(path.join(__dirname, '../../clother-angular/dist/clother-angular/index.html'));
});

if (!fs.existsSync("./image")) fs.mkdirSync("./image");
if (!fs.existsSync("./image/recommendation")) fs.mkdirSync("./image/recommendation");

const server: http.Server = http.createServer(app);
server.listen(port, () => {
    /* tslint:disable */
    console.log(`Server is starting: ${port}`);
    /* tslint:enable */

    const logWithoutDatabaseService: LogWithoutDatabaseService = new LogWithoutDatabaseService();
    logWithoutDatabaseService.logInfo({ message: `Server is starting: ${port}` });
});