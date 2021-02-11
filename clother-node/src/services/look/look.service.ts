import { ObjectID } from "mongodb";
import LookDatabase from "../../database/look/look.database";
import Create from "../../interface/class/create";
import Look from "../../interface/object/look";

export default class LookService implements Create<Look> {
    private readonly lookDatabase: LookDatabase;
    constructor(collection: string = "look") {
        this.lookDatabase = new LookDatabase(collection);
    }

    public create(info: { name: string, clothes: { _id: ObjectID }[], user: { _id: ObjectID }}): Promise<Look | null> {
        return this.lookDatabase.create(info);
    }
}