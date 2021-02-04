import fs from 'fs';

export const mongodbUrl: string = fs.readFileSync('src/database/mongodb_url.txt', 'utf8');

export const dbClothes: string = "clothes";
export const dbServerInfo: string = "server-info";
export const dbUser: string = "user";