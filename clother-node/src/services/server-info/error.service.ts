import ErrorDatabase from "../../database/server-info/error.database";
import Create from "../../interface/class/create";
import Error from "../../interface/object/error";

export default class ErrorService implements Create<Error> {
    private readonly errorDatabase: ErrorDatabase;

    constructor(collection: string = "error") {
        this.errorDatabase = new ErrorDatabase(collection);
    }

    public create(info: { info: any }): Promise<Error | null> {
        return this.errorDatabase.create(info);
    }
}