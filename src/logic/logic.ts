import { Record } from "@/storage/storage";

export type recordElapsed = Record & { elapsed: number };

function getElapsed (row: Record, dayStart: number, dayEnd: number) {
    const end = Math.min(row.end_time, dayEnd);
    const start = Math.max(row.start_time, dayStart);
    return (end - start);
  };
  
export function addElapsed (rows: Record[], dayStart: number, dayEnd: number) {
    return rows.map((row) => ({ ...row, elapsed: getElapsed(row, dayStart, dayEnd) }));
}

export function sumElapsed(data: recordElapsed[]) {
    return data.reduce((total, row) => total + row.elapsed, 0)
}

export function getTimeFormat (s: number, miliSec = true) {
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