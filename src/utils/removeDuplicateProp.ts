import { TDataPhone } from "@/types/TMockPhones";

export function removeDuplicateProps(arr: TDataPhone[]): TDataPhone[] {
  if (arr.length === 0) return [];
  
  const result = JSON.parse(JSON.stringify(arr)) as TDataPhone[];
  const firstObj = arr[0];

  const keysToRemove = Object.keys(firstObj).filter(key => {
    const value = firstObj[key as keyof TDataPhone];
    return arr.every(obj => obj[key as keyof TDataPhone] === value);
  });

  return result.map(obj => {
    const newObj = { ...obj };
    keysToRemove.forEach(key => {
      delete newObj[key as keyof TDataPhone];
    });
    return newObj;
  });
}