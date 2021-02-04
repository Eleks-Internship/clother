import { ObjectID } from "mongodb";
import Create from "../../interface/class/create";
import Get from "../../interface/class/get";
import Update from "../../interface/class/update";
import User from "../../interface/object/user";
import Database from "../database";
import { dbUser } from "../database_info";

export default class UserDatabase extends Database<User> implements Create<User>, Get<User>, Update {
    constructor(collection: string = "user") {
        super({ database: dbUser, collection });
    }

    public create(info: { firstName: string, lastName: string, email: string, password: string }): Promise<User | null> {
        return super.create(info);
    }

    public get(_id: ObjectID): Promise<User | null> {
        return super.get(_id);
    }

    public update(info: { _id: ObjectID, data: { firstName: string, lastName: string, email: string, password: string } }): Promise<boolean> {
        return super.update(info);
    }
}