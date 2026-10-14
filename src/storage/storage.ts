import * as SQLite from 'expo-sqlite';

const dbPromise = SQLite.openDatabaseAsync('myDB');

export type Activity = { 
    act_id: number,
    name: string,
    category: string 
};

export type Record = {
    activity: number, 
    start_time: number, 
    end_time: number
}

export type ActivityGroup = { 
    title: string; 
    data: { 
        act_id: number,
        name: string 
    }[] 
};

export async function reset() {
    const db = await dbPromise;
    await db.execAsync(`
        DROP TABLE Activities;

        DROP TABLE Records;
    `)
}

export async function setup() {

    const db = await dbPromise;
    

    await db.execAsync(`
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS Activities (
            act_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL, 
            category TEXT
        );

        CREATE TABLE IF NOT EXISTS Records (
            rec_id INTEGER PRIMARY KEY AUTOINCREMENT,
            activity_id INTEGER NOT NULL REFERENCES Activities(act_id),
            start_time INTEGER NOT NULL,
            end_time INTEGER NOT NULL
        );
    `);

    const current  = await getActivities();

    if (current.length === 0) {
        await db.execAsync(`
            INSERT INTO Activities (name, category) VALUES ('Studying', 'Studying');
            INSERT INTO Activities (name, category) VALUES ('Exercise', 'Exercise');
            INSERT INTO Activities (name, category) VALUES ('Chore', 'Chore');
        `)
    }
};

export async function getActivities(): Promise<Activity[]> {
    const db = await dbPromise;

    return await db.getAllAsync<Activity>(`
        SELECT * FROM Activities;    
    `);
};

export async function getRecords(): Promise<Record[]> {
    const db = await dbPromise;

    return await db.getAllAsync<Record>(`
        SELECT * FROM Records;    
    `);
};

// currently only adds activity, not edit
export async function saveActivity(newAct: Activity) {
    const db = await dbPromise;

    const check = await db.getAllAsync<Activity>(`
        SELECT * FROM Activities
        WHERE name = ?
    `, newAct.name);

    if (check.length !== 0) {
        // what to do if there is an entry by that name already 
        return;
    }

    await db.runAsync(`
        INSERT INTO Activities
        VALUES (?, ?)
    `, newAct.name, newAct.category);
};

export async function saveRecord(newRec: Record) {
    const db = await dbPromise;

    await db.runAsync(`
        INSERT INTO Records
        VALUES (?, ?, ?)
    `, newRec.activity, newRec.start_time, newRec.end_time);
};

export async function getActivitiesByCategory() {
    const db = await dbPromise;

    const rows = await db.getAllAsync<Activity>(`
        SELECT * FROM Activities
        ORDER BY category, name;
    `)

    const groups: ActivityGroup[] = [];

    for (const row of rows) {
        let group = groups.find((g) => g.title === row.category);
        
        if (!group) {
            group = {title: row.category, data:[]};
            groups.push(group);
        }
        group.data.push({act_id: row.act_id, name: row.name});
    }

    return groups;
}