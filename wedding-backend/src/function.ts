export function objectToString(obj: any): string {
  return JSON.stringify(obj);
}

export function stringToObject(str: string): any {
  return JSON.parse(str);
}
