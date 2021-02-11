import Create from "../../interface/class/create";
import Error from "../../interface/object/error";
import DatabaseObject from "../database_object";
import { dbServerInfo } from "../database_info";

export default class ErrorDatabase extends DatabaseObject<Error> implements Create<Error> {
    constructor(collection: string = "error") {
        super({ database: dbServerInfo, collection });
    }

    public create(info: { info: any }): Promise<Error | null> {
        return super.create(info);
    }
}