import { ObjectID } from "mongodb";
import Clothes from "./clothes";
import User from "./user";

export default interface Look {
    readonly _id: ObjectID;
    name: string;
    clothes: Clothes[] | { _id: ObjectID; }[];
    readonly user: User | { _id: ObjectID; };
    readonly dateOfCreation: Date;
}