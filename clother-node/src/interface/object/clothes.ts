import { ObjectID } from "mongodb";

export default interface Clothes {
    readonly _id: ObjectID;
    name: string;
    photoName: string;
    urlForBuy?: string;
    readonly dateOfCreation: Date;
}