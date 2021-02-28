import { ObjectID } from "mongodb";
import User from "./user";

export default interface Clothes {
    readonly _id: ObjectID;
    name: string;
    photoName: string;
    urlForBuy?: string;
    infoOfClothes?: {
        label: string;
        probability: string;
    }[];
    readonly user: User | { _id: ObjectID; };
    readonly dateOfCreation: Date;
}