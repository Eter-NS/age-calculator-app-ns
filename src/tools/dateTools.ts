import { IncomingFormData } from "../types and interfaces/interfaces";

export function getDateInMonth(first: Date): number;
export function getDateInMonth(first: number, second: number): number;
export function getDateInMonth(first: Date | number, second?: number): number {
  if (typeof first === "number" && typeof second === "number")
    return new Date(first, second + 1, 0).getDate();

  if (typeof first === "object" && "getMonth" in first)
    return new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  else throw new Error(`${typeof first} is not assignable to type Number or Date object`);
}

export function returnMonthsDifference(systemDate: Date, userDate: Date): number {
  const yearsDifference = (systemDate.getFullYear() - userDate.getFullYear()) * 12;
  const monthsOperation = systemDate.getMonth() - userDate.getMonth();

  const monthsDifference =
    userDate.getDate() <= systemDate.getDate() ? monthsOperation : monthsOperation - 1;

  return yearsDifference + monthsDifference;
}

export function createUserDate({ year, month, day }: IncomingFormData) {
  return new Date(year, month - 1, day);
}
