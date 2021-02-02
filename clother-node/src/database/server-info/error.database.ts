import Create from "../../interface/class/create";
import Error from "../../interface/object/error";
import Database from "../database";
import { dbServerInfo } from "../database_info";

export default class ErrorDatabase extends Database<Error> implements Create<Error> {
    constructor(collection: string = "error") {
        super({ database: dbServerInfo, collection });
    }

    public create(info: { info: any }): Promise<Error | null> {
        return super.create(info);
    }
}