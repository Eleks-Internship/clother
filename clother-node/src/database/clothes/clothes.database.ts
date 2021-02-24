import { ObjectID } from "mongodb";
import Create from "../../interface/class/create";
import Delete from "../../interface/class/delete";
import Get from "../../interface/class/get";
import Update from "../../interface/class/update";
import Clothes from "../../interface/object/clothes";
import DatabaseObject from "../database_object";
import { dbClothes } from "../database_info";
import GetListofUser from "../../interface/class/get_list_of_user";

export default class ClothesDatabase extends DatabaseObject<Clothes> implements Create<Clothes>, Get<Clothes>, GetListofUser<Clothes>, Update, Delete {
    constructor(collection: string = "clothes") {
        super({ database: dbClothes, collection });
    }

    public create(info: { name: string, photoName: string, urlForBuy: string, infoOfClothes: { label: string, probability: string }[], user: { _id: ObjectID }}): Promise<Clothes | null> {
        return super.create(info);
    }

    public get(_id: ObjectID): Promise<Clothes | null> {
        return super.get(_id);
    }

    public getListOfUser(info: { user: { _id: ObjectID } }): Promise<Clothes[]> {
        return super.getListByKeys(info);
    }

    public update(info: { _id: ObjectID, data: { name: string, photoName: string, urlForBuy: string } }): Promise<boolean> {
        return super.update(info);
    }

    public delete(_id: ObjectID): Promise<boolean> {
        return super.delete(_id);
    }
}