import { ObjectID } from "mongodb";
import Create from "../../interface/class/create";
import Get from "../../interface/class/get";
import Update from "../../interface/class/update";
import User from "../../interface/object/user";
import DatabaseObject from "../database_object";
import { dbUser } from "../database_info";
import GetList from "../../interface/class/get_list";

export default class UserDatabase extends DatabaseObject<User> implements Create<User>, Get<User>, GetList<User>, Update {
    constructor(collection: string = "user") {
        super({ database: dbUser, collection });
    }

    public create(info: { firstName: string, lastName: string, email: string, password: string }): Promise<User | null> {
        return super.create(info);
    }

    public get(_id: ObjectID): Promise<User | null> {
        return super.get(_id);
    }

    public getByKeys(info: object): Promise<User | null> {
        return super.getByKeys(info);
    }

    public getList(): Promise<User[]> {
        return super.getList();
    }

    public update(info: { _id: ObjectID, data: { firstName: string, lastName: string, email: string, password: string } }): Promise<boolean> {
        return super.update(info);
    }
}