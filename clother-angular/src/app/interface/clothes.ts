import { User } from './user';

export interface Clothes {
    readonly _id: string;
    name: string;
    photoName: string;
    urlForBuy?: string;
    infoOfClothes?: {
        item: string;
        tags: string[];
    };
    readonly user: User | { _id: string; lastName?: string; firstName?: string; };
    readonly dateOfCreation: Date;
}
