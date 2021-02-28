import { User } from './user';

export interface Clothes {
    readonly _id: string;
    name: string;
    photoName: string;
    urlForBuy?: string;
    infoOfClothes?: {
        label: string;
        probability: string;
    }[];
    readonly user: User | { _id: string; };
    readonly dateOfCreation: Date;
}
