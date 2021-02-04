import jsonwebtoken from 'jsonwebtoken';

export default class AuthService {
    private readonly secretKey: string = "elbjlsdhbgelyrbgdhgbw;rigbsd/fnweoigbw';egbdslhjgbslyguwvbgulwebfiuwebf;sd.fbn;eirgbuerg;bsdgbu;iebguer;gubrg";

    public createToken(id: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            jsonwebtoken.sign({ id }, this.secretKey, (error: any, token: any) => {
                resolve(token);
                if (error) reject(error);
            });
        });
    }
}