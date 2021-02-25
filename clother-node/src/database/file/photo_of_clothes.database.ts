import GridFsStorage from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import Database from '../database';
import { mongodbUrl } from '../database_info';
import mongoose from 'mongoose';
import { ObjectID } from 'mongodb';
import LogWithoutDatabaseService from '../../services/server-info/log/log_without_database.service';
import File from '../../interface/object/file';

export default class PhotoOfClothesDatabase extends Database {
    private readonly database: string = "file";

    constructor() {
        super();
    }

    private async grid(): Promise<Grid.Grid> {
        const conn = mongoose.createConnection(mongodbUrl);
        const gfs: Grid.Grid = Grid((await conn).db, mongoose.mongo);
        gfs.collection('uploads');
        return gfs;
    }

    public save(): any {
        this.grid();
        return new GridFsStorage({
            url: mongodbUrl,
            file: (req, file) => {
                return new Promise((resolve, reject) => {
                    crypto.randomBytes(16, (err, buf) => {
                        if (err) {
                            return reject(err);
                        }
                        const filename = buf.toString('hex') + path.extname(file.originalname);
                        const fileInfo = {
                            filename,
                            bucketName: 'uploads'
                        };
                        resolve(fileInfo);
                    });
                });
            }
        });
    }

    public downoladFile(info: { filename: string }): Promise<boolean> {
        return new Promise<boolean>(async (resolve) => {
            if (await this.grid()) {
                const fsstreamwrite: fs.WriteStream = fs.createWriteStream(path.join(process.cwd(), `./image/recommendation/${info.filename}`));
                const readstream: any = (await this.grid()).createReadStream({ filename: info.filename });
                readstream.pipe(fsstreamwrite);
                readstream.on("close", (file: any) => {
                    resolve(true);
                });
            } else {
                resolve(false);
            }
        });
    }

    public getFile(info: { filename: string }): Promise<any> {
        return new Promise<any>(async (resolve,  reject) => {
            (await this.grid()).files.findOne({ filename: info.filename }, async (err, file) => {
                if (!file || file.length === 0) {
                    return resolve(false);
                }

                if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                    const readstream = (await this.grid()).createReadStream(file.filename);
                    resolve(readstream);
                } else {
                    resolve(false);
                }
            });
        });
    }

    public get(info: { filename: string }): Promise<File | null> {
        return new Promise((resolve, reject) => {
            Database.connect().then(client => {
                client.db(this.database).collection("uploads.files").findOne({
                    filename: info.filename
                }, (error: object, data: any) => {
                    resolve(data ?? null);

                    if (error) {
                        const logWithoutDatabaseService: LogWithoutDatabaseService = new LogWithoutDatabaseService();
                        logWithoutDatabaseService.logError({ message: error });

                        reject(error);
                    }
                });

                client.close();
            }).catch(error => {
                const logWithoutDatabaseService: LogWithoutDatabaseService = new LogWithoutDatabaseService();
                logWithoutDatabaseService.logError({ message: error });

                resolve(null);
                reject(error);
            });
        });
    }

    public deleteChunk(filesId: ObjectID): Promise<boolean> {
        return new Promise((resolve, reject) => {
            Database.connect().then(client => {
                client.db(this.database).collection("uploads.chunks").deleteMany({
                    files_id: filesId
                }, (error: object, data: any) => {
                    resolve(data ? true : false);

                    if (error) {
                        const logWithoutDatabaseService: LogWithoutDatabaseService = new LogWithoutDatabaseService();
                        logWithoutDatabaseService.logError({ message: error });

                        reject(error);
                    }
                });

                client.close();
            }).catch(error => {
                const logWithoutDatabaseService: LogWithoutDatabaseService = new LogWithoutDatabaseService();
                logWithoutDatabaseService.logError({ message: error });

                resolve(false);
                reject(error);
            });
        });
    }

    public deleteFile(_id: ObjectID): Promise<boolean> {
        return new Promise((resolve, reject) => {
            Database.connect().then(client => {
                client.db(this.database).collection("uploads.files").deleteOne({
                    _id
                }, (error: object, data: any) => {
                    resolve(data ? true : false);

                    if (error) {
                        const logWithoutDatabaseService: LogWithoutDatabaseService = new LogWithoutDatabaseService();
                        logWithoutDatabaseService.logError({ message: error });

                        reject(error);
                    }
                });

                client.close();
            }).catch(error => {
                const logWithoutDatabaseService: LogWithoutDatabaseService = new LogWithoutDatabaseService();
                logWithoutDatabaseService.logError({ message: error });

                resolve(false);
                reject(error);
            });
        });
    }
}