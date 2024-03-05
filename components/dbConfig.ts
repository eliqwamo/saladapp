import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db');

const setupDatabase = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(t => {
            t.executeSql(
                "CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, latitude FLOAT, longitude FLOAT);",
                [],
                () => resolve(true),
                (_, error) => {
                    console.error('Database Error: ', error);
                    reject(false)
                }
            );
        });
    });
}

export default setupDatabase;