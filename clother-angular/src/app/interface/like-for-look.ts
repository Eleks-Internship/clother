import { Look } from './look';
import { User } from './user';

export interface LikeForLook {
    readonly _id: string;
    readonly look: Look | { _id: string; };
    readonly user: User | { _id: string; };
    readonly dateOfCreation: Date;
}
