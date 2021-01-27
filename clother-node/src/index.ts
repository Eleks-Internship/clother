import express from 'express';
import http from 'http';
import path from 'path';

const app: express.Application = express();
const port: string | number = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../clother-angular/dist/clother-angular')));

app.get('**', (req: express.Request, res: express.Response) => {
    res.status(200).sendFile(path.join(__dirname, '../../clother-angular/dist/clother-angular/index.html'));
});

const server: http.Server = http.createServer(app);
server.listen(port, () => {
    /* tslint:disable */
    console.log(`Server is starting: ${port}`);
    /* tslint:enable */
});