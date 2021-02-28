import { Clothes } from "./clothes";
import { User } from "./user";

export interface Look {
    readonly _id: string;
    name: string;
    clothes: Clothes[] | { _id: string; }[];
    readonly user: User | { _id: string; };
    readonly dateOfCreation: Date;
}
