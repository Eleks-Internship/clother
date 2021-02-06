import { ObjectID } from "mongodb";
import Create from "../../interface/class/create";
import Delete from "../../interface/class/delete";
import Get from "../../interface/class/get";
import Update from "../../interface/class/update";
import Clothes from "../../interface/object/clothes";
import DatabaseObject from "../database_object";
import { dbClothes } from "../database_info";

export default class ClothesDatabase extends DatabaseObject<Clothes> implements Create<Clothes>, Get<Clothes>, Update, Delete {
    constructor(collection: string = "clothes") {
        super({ database: dbClothes, collection });
    }

    public create(info: { name: string, photoName: string, urlForBuy: string , user: { _id: ObjectID }}): Promise<Clothes | null> {
        return super.create(info);
    }

    public get(_id: ObjectID): Promise<Clothes | null> {
        return super.get(_id);
    }

    public update(info: { _id: ObjectID, data: { name: string, photoName: string, urlForBuy: string } }): Promise<boolean> {
        return super.update(info);
    }

    public delete(_id: ObjectID): Promise<boolean> {
        return super.delete(_id);
    }
}