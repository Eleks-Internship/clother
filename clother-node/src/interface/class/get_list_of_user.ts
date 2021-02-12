import { ObjectID } from "mongodb";

export default interface GetListofUser<T> {
    getListOfUser(info: { user: { _id: ObjectID } }): Promise<T[]>;
}