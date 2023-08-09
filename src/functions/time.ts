import { TimeNoDays, TimeWithClock } from "src/utils/types";
import { toNumber } from "./formatting";

export function getTimezoneFromDate(date: Date): string {
  const timezone = date.toString().split(" ")[5];
  return timezone;
}

export function clockify(array: number[], wantTimezone?: boolean): string {
  const time: string = array.map(t => String(t).padStart(2, "0")).join(":");
  return `${time}${wantTimezone ? ` (${getTimezoneFromDate(new Date())})` : ""}`;
}

export function clockifyNoTensInHours(array: number[]): string {
  return `${array.join(":")} (${getTimezoneFromDate(new Date())})`;
}

// Turns h/m/s into decimal time seconds
export function secondify(hours: number, minutes: number, seconds: number): number {
  return Math.floor(((hours * 60 * 60) + (minutes * 60) + (seconds)) / 0.864);
}

export function dhmsFromMS(ms: number, wantTimezone?: boolean): TimeWithClock {
  const days = Math.floor(ms / (3600000 * 24)),
    hours = Math.floor(ms % (3600000 * 24) / 3600000),
    minutes = Math.floor(ms % 3600000 / 60000),
    seconds = Math.floor(ms % 60000 / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    clock: clockify([days, hours, minutes, seconds], wantTimezone)
  };
}

export function dateToHMS(date: Date): TimeNoDays {
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  };
}

export function decimalTimeAsHMS(date: Date): string {
  const hms: TimeNoDays = dateToHMS(date);
  const seconds: number = secondify(hms.hours, hms.minutes, hms.seconds);
  const timeString: string = `0000${seconds.toString()}`.replace(/^.*(.{5})$/u, "$1");

  return clockifyNoTensInHours([toNumber(timeString.substring(0, 1)), toNumber(timeString.substring(1, 3)), toNumber(timeString.substring(3, 5))]);
}

export function decimalTimeAsDHMSInMilliseconds(ms: number): string {
  const dhms: TimeWithClock = dhmsFromMS(ms);
  const seconds: number = secondify(dhms.hours, dhms.minutes, dhms.seconds);
  const timeString: string = `0000${seconds.toString()}`.replace(/^.*(.{5})$/u, "$1");

  return clockify([dhms.days, toNumber(timeString.substring(0, 1)), toNumber(timeString.substring(1, 3)), toNumber(timeString.substring(3, 5))]);
}