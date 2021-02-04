import { ObjectID } from "mongodb";

export default interface Get<T> {
    get(_id: ObjectID): Promise<T | null>;
}