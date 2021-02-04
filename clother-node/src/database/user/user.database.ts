import Create from "../../interface/class/create";
import User from "../../interface/object/user";
import Database from "../database";
import { dbUser } from "../database_info";

export default class UserDatabase extends Database<User> implements Create<User> {
    constructor(collection: string = "user") {
        super({ database: dbUser, collection });
    }

    public create(info: { firstName: string, lastName: string, email: string, password: string }): Promise<User | null> {
        return super.create(info);
    }
}