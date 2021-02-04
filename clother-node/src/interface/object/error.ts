import { ObjectID } from "mongodb";

export default interface Error {
    readonly _id: ObjectID;
    info: any;
    readonly dateOfCreation: Date;
}