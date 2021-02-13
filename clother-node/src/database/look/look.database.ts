import Create from "../../interface/class/create";
import Look from "../../interface/object/look";
import DatabaseObject from "../database_object";
import { dbLook } from '../database_info';
import { ObjectID } from "mongodb";
import GetList from "../../interface/class/get_list";
import Update from "../../interface/class/update";

export default class LookDatabase extends DatabaseObject<Look> implements Create<Look>, GetList<Look>, Update {

    constructor(collection: string = "look") {
        super({ database: dbLook, collection });
    }

    public create(info: { name: string, clothes: { _id: ObjectID }[], user: { _id: ObjectID }}): Promise<Look | null> {
        return super.create(info);
    }

    public getList(): Promise<Look[]> {
        return super.getList();
    }

    public update(info: { _id: ObjectID, data: { name: string, clothes: { _id: ObjectID }[] } }): Promise<boolean> {
        return super.update(info);
    }
}