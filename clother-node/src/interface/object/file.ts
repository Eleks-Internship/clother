import { ObjectID } from "mongodb"

export default interface File {
    _id: ObjectID;
    length: number;
    chunkSize: number;
    uploadDate: Date;
    filename: string;
    md5: string;
    contentType: string;
}