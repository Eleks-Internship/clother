import UserDatabase from "../../database/user/user.database";
import Create from "../../interface/class/create";
import User from "../../interface/object/user";
import PasswordService from "./password.service";

export default class UserService implements Create<User> {
    private readonly userDatabase: UserDatabase;

    constructor(collection: string = "user") {
        this.userDatabase = new UserDatabase(collection);
    }

    public async create(info: { firstName: string, lastName: string, email: string, password: string }): Promise<User | null> {
        const passwordService: PasswordService = new PasswordService(info.password);
        const passwordHash: string = passwordService.hashPassword();

        const user: User | null = await this.userDatabase.create({ firstName: info.firstName, lastName: info.lastName, email: info.email, password: passwordHash });
        delete user?.password;

        return user;
    }
}