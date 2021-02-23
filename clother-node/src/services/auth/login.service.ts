import { ObjectID } from "mongodb";
import User from "../../interface/object/user";
import LogWithDatabaseService from "../server-info/log/log_without_database.service";
import PasswordService from "../user/password.service";
import UserService from "../user/user.service";
import AuthService from "./auth.service";

export default class LoginService extends AuthService {
    private readonly collectionUser: string;

    constructor(collectionUser: string = 'user') {
        super();

        this.collectionUser = collectionUser;
    }

    public getTokenAfterCreateUser(info: { firstName: string, lastName: string, email: string, password: string }): Promise<string> {
        const userService: UserService = new UserService(this.collectionUser);
        return userService.create(info).catch(error => {
            const logWithDatabaseService: LogWithDatabaseService = new LogWithDatabaseService();
            logWithDatabaseService.logError({ message: error });
        }).then(user => {
            if (!user) return '';

            return super.createToken(user._id.toString());
        });
    }

    public async getToken(info: { email: string, password: string }): Promise<string> {
        const passwordService: PasswordService = new PasswordService(info.password)
        const userService: UserService = new UserService(this.collectionUser);

        const user: User | null = await userService.getByEmail({ email: info.email });

        if (user?.password && passwordService.verificatePassword(user?.password)) {
            return super.createToken(user._id.toString());
        }
        return '';
    }

    public async getTokenBySocialMedia(info: { lastName: string, firstName: string, email: string }): Promise<string> {
        const userService: UserService = new UserService(this.collectionUser);

        let user: User | null = await userService.getByEmail({ email: info.email });

        if (!user) {
            user = await userService.create({ firstName: info.firstName, lastName: info.lastName, email: info.email, password: ''})
        }

        if (user) return super.createToken(user._id.toString());
        return '';
    }

    public async getIdOfUserLogin(info: { token: string | undefined }): Promise<ObjectID | null> {
        if (!info.token) return null;

        const { access, authData } = await super.verificateToken(info.token);

        if (!access) return null;

        try {
            return new ObjectID(authData?.id);
        } catch (error) {
            const logWithDatabaseService: LogWithDatabaseService = new LogWithDatabaseService();
            logWithDatabaseService.logError({ message: error });

            return null;
        }
    }
}