import { ObjectID } from "mongodb";
import LookDatabase from "../../database/look/look.database";
import Create from "../../interface/class/create";
import Delete from "../../interface/class/delete";
import GetList from "../../interface/class/get_list";
import Update from "../../interface/class/update";
import Look from "../../interface/object/look";

export default class LookService implements Create<Look>, GetList<Look>, Update, Delete {
    private readonly lookDatabase: LookDatabase;
    constructor(collection: string = "look") {
        this.lookDatabase = new LookDatabase(collection);
    }

    public create(info: { name: string, clothes: { _id: ObjectID }[], user: { _id: ObjectID }}): Promise<Look | null> {
        return this.lookDatabase.create(info);
    }

    public getList(): Promise<Look[]> {
        return this.lookDatabase.getList();
    }

    public update(info: { _id: ObjectID, data: { name: string, clothes: { _id: ObjectID }[] } }): Promise<boolean> {
        return this.lookDatabase.update(info);
    }

    public delete(_id: ObjectID): Promise<boolean> {
        return this.lookDatabase.delete(_id);
    }
}