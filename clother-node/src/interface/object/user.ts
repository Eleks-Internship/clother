import { ObjectID } from "mongodb";

export default interface User {
    readonly _id: ObjectID;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    readonly dateOfCreation: Date;
}