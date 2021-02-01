import { ObjectID } from "mongodb";

export default interface Delete {
    delete(_id: ObjectID): Promise<boolean>;
}