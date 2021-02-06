import User from "../../interface/object/user";
import LogWithDatabaseService from "../server-info/log/log_without_database.service";
import PasswordService from "../user/password.service";
import UserService from "../user/user.service";
import AuthService from "./auth.service";

export default class LoginService {
    private readonly collectionUser: string;

    constructor(collectionUser: string = 'user') {
        this.collectionUser = collectionUser;
    }

    public getTokenAfterCreateUser(info: { firstName: string, lastName: string, email: string, password: string }): Promise<string> {
        const userService: UserService = new UserService(this.collectionUser);
        return userService.create(info).catch(error => {
            const logWithDatabaseService: LogWithDatabaseService = new LogWithDatabaseService();
            logWithDatabaseService.logError({ message: error });
        }).then(user => {
            if (!user) return '';

            const authService: AuthService = new AuthService();
            return authService.createToken(user._id.toString());
        });
    }

    public async getToken(info: { email: string, password: string }): Promise<string> {
        const passwordService: PasswordService = new PasswordService(info.password)
        const userService: UserService = new UserService(this.collectionUser);

        const user: User | null = await userService.getByEmail({ email: info.email });

        if (user?.password && passwordService.verificatePassword(user?.password)) {
            const authService: AuthService = new AuthService();
            return authService.createToken(user._id.toHexString());
        }
        return '';
    }
}