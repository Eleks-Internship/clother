import { ObjectID } from "mongodb";
import UserDatabase from "../../database/user/user.database";
import Create from "../../interface/class/create";
import Get from "../../interface/class/get";
import Update from "../../interface/class/update";
import User from "../../interface/object/user";
import PasswordService from "./password.service";

export default class UserService implements Create<User>, Get<User>, Update {
    private readonly userDatabase: UserDatabase;

    constructor(collection: string = "user") {
        this.userDatabase = new UserDatabase(collection);
    }

    public async create(info: { firstName: string, lastName: string, email: string, password: string }): Promise<User | null> {
        const passwordService: PasswordService = new PasswordService(info.password);
        const passwordHash: string = passwordService.hashPassword();

        const emailIsBusy: boolean = !!await this.userDatabase.getByKeys({ email: info.email });
        if (emailIsBusy) return null;

        const user: User | null = await this.userDatabase.create({ firstName: info.firstName, lastName: info.lastName, email: info.email, password: passwordHash });
        delete user?.password;

        return user;
    }

    public async get(_id: ObjectID): Promise<User | null> {
        const user: User | null = await this.userDatabase.get(_id);
        delete user?.password;

        return user;
    }

    public update(info: { _id: ObjectID, data: { firstName: string, lastName: string, email: string, password: string } }): Promise<boolean> {
        return this.userDatabase.update(info);
    }
}