import jsonwebtoken from 'jsonwebtoken';

interface VerifyToken {
    access: boolean;
    authData: { id: string } | undefined;
}

export default abstract class AuthService {
    private readonly secretKey: string = "elbjlsdhbgelyrbgdhgbw;rigbsd/fnweoigbw';egbdslhjgbslyguwvbgulwebfiuwebf;sd.fbn;eirgbuerg;bsdgbu;iebguer;gubrg";

    protected createToken(id: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            jsonwebtoken.sign({ id }, this.secretKey, (error: any, token: any) => {
                resolve(token);
                if (error) reject(error);
            });
        });
    }

    protected verificateToken(token: string): Promise<VerifyToken> {
        token = token.replace('Bearer ', '');

        return new Promise<VerifyToken>((resolve, reject) => {
            jsonwebtoken.verify(token, this.secretKey, (error: any, authData: any) => {
                if (error) {
                    reject(error);
                    resolve({ access: false, authData: undefined });
                } else {
                    if (authData && authData.hasOwnProperty('id') ) {
                        resolve({ access: true, authData: { id: authData.id } });
                    } else {
                        resolve({ access: false, authData: undefined });
                    }
                }
            });
        });
    }
}