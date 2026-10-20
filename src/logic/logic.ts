import { Activity, Record } from "@/storage/storage";

/*
 * Blogger — colourlovers.com
 * Palette by plamenj, 2007
 * https://www.colourlovers.com/palette/185999/Blogger
 * Colors named by Xpeder, jspencer, rrradio
 * Licence: CC-BY-NC-SA — http://creativecommons.org/licenses/by-nc-sa/3.0/
 */
export const colors = {
  orange: "#FF6600",
  darkblue: "#104386",
  lightblue: "#6699FF",
  cream: "#F5EDE3",
  sandcream: "#E1D4C0",
  text: "#333333",
};

export type recordStats = Record & { elapsed: number, act_name: string};

function getElapsed (row: Record, dayStart: number, dayEnd: number) {
    const end = Math.min(row.end_time, dayEnd);
    const start = Math.max(row.start_time, dayStart);
    return (end - start);
  };
  
export function getRecordStats (rows: Record[], dayStart: number, dayEnd: number, activities: Activity[]) {
  const names = new Map(activities.map((act) => [act.act_id, act.name]));
  
  return rows.map((row) => ({...row, elapsed: getElapsed(row, dayStart, dayEnd), act_name: names.get(row.activity_id) ?? 'unknown'}))
}

export function sumElapsed(data: recordStats[]) {
    return data.reduce((total, row) => total + row.elapsed, 0)
}

export function getTimeFormat (s: number, miliSec = true) {
    s = s ?? 0;
    const inSec = Math.floor(s / 1000);
  
    const hr = Math.floor(inSec / 3600);
    const min = Math.floor((inSec % 3600) / 60);
    const sec = inSec % 60;
    const ms = Math.floor((s % 1000) / 10);
  
    const pad = (n: number) => String(n).padStart(2, "0");
  
    return (
      `${pad(hr)}:${pad(min)}:${pad(sec)}` + `${miliSec ? "." + pad(ms) : ""}`
    );
  };