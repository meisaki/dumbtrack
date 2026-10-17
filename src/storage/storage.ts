import * as SQLite from 'expo-sqlite';

const dbPromise = SQLite.openDatabaseAsync('myDB');

export type Activity = { 
    act_id: number,
    name: string,
    category: string 
};

export type Record = {
    rec_id: number,
    activity_id: number, 
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

export async function debugReset() {
    const db = await dbPromise;
    await db.execAsync(`
        DROP TABLE IF EXISTS Records;
        DROP TABLE IF EXISTS Activities;
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
            INSERT INTO Activities (name, category) VALUES ('Leisure', 'Leisure');
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
export async function saveActivity(name: string, category: string) {
    const db = await dbPromise;

    const check = await db.getAllAsync<Activity>(`
        SELECT * FROM Activities
        WHERE name = ?
    `, name);

    // if (check.length !== 0) {
    //     // what to do if there is an entry by that name already 
    //     return;
    // }

    await db.runAsync(`
        INSERT INTO Activities (name, category)
        VALUES (?, ?)
    `, name, category);
};

export async function saveRecord(act_id: number, start_time: number, end_time: number) {
    const db = await dbPromise;

    await db.runAsync(`
        INSERT INTO Records (activity_id, start_time, end_time)
        VALUES (?, ?, ?)
    `, act_id, start_time, end_time);
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

/**
 * Gets the name of one activity by its id
 * 
 * @param id acitivty's act id
 * @returns the activity name
 */
export async function getSingleActivity(id: number) {
    const db = await dbPromise;
    const row = await db.getFirstAsync<Activity>(`
        SELECT * FROM Activities
        WHERE act_id = ?    
    `, id)
    return row;
}

/**
 * Return records that starts or ends within the given period
 * 
 * @param dayStart start of the day in ms 
 * @param dayEnd end of the day in ms
 */
export async function getRecords2(dayStart: number, dayEnd: number) {
    const db = await dbPromise;

    const rows = await db.getAllAsync<Record>(`
        SELECT * FROM Records
        WHERE start_time < ? AND end_time > ?
    `,dayEnd, dayStart)

    return rows
}

export async function debugAddRecords() {
    const db = await dbPromise;

    const now = new Date()
    const start = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    ).getTime()
    const end =new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
    ).getTime()

    const hr = 1 * 60 * 60 * 1000;

    const recs: [number, number, number][] = [
        [1, start + 1 * hr, start + 3 * hr],
        [2, start + 3 * hr, start + 5.5 * hr],
        [3, start + 6 * hr, start + 7.2 * hr],
        [4, start - 2 * hr, start + 0.5 * hr],  // crosses into today
        // [5, end - 1.3 * hr, end + 4 * hr],      // crosses out of today
      ];

    for (const [a, s, e] of recs) {
        await db.runAsync(
        "INSERT INTO Records (activity_id, start_time, end_time) VALUES (?, ?, ?)",
        [a, s, e]
        );
    }
}

export async function deleteActivity(id: number) {
    const db = await dbPromise;
    await db.runAsync(`
        DELETE FROM Activities
        WHERE act_id = ?;    
    `, id)
}