import { ObjectID } from "mongodb";

export default interface Image {
    readonly _id: ObjectID;
    item: string;
    tags: string[];
    imageName: string;
    img: string;
}