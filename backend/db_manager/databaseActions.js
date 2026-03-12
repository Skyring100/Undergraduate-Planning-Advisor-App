import { DatabaseSync } from "node:sqlite";
const DATABASE_PATH = './db/database.db';
const db = initalizeDatabase();

function initalizeDatabase(){
    return new DatabaseSync(DATABASE_PATH);
}

export function getDatabaseConnection(){
    return db;
}