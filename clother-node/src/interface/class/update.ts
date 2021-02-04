import { ObjectID } from "mongodb";

export default interface Update {
    update(info: { _id: ObjectID, data: any}): Promise<boolean>;
}