import fs from 'fs';

export const mongodbUrl: string = fs.readFileSync('src/database/mongodb_url.txt', 'utf8');