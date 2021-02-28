import { Binary, ObjectID } from "mongodb";

export default interface Chunks {
    _id: ObjectID;
    files_id: ObjectID;
    n: number;
    data: Binary;
}