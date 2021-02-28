import { User } from "./user";

export interface Clothes {
    readonly _id: string;
    name: string;
    photoName: string;
    urlForBuy?: string;
    readonly user: User | { _id: string; };
    readonly dateOfCreation: Date;
}
