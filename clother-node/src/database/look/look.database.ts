import Create from "../../interface/class/create";
import Look from "../../interface/object/look";
import DatabaseObject from "../database_object";
import { dbLook } from '../database_info';
import { ObjectID } from "mongodb";

export default class LookDatabase extends DatabaseObject<Look> implements Create<Look> {

    constructor(collection: string = "look") {
        super({ database: dbLook, collection });
    }

    public create(info: { name: string, clothes: { _id: ObjectID }[], user: { _id: ObjectID }}): Promise<Look | null> {
        return super.create(info);
    }
}