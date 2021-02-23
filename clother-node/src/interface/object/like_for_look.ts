import { ObjectID } from "mongodb";
import Look from "./look";
import User from "./user";

export default interface LikeForLook {
    readonly _id: ObjectID;
    readonly look: Look | { _id: ObjectID; };
    readonly user: User | { _id: ObjectID; };
    readonly dateOfCreation: Date;
}