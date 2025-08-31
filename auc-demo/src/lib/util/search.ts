import { Car } from "../types";

export function normalizeString(str: string): string {
  return str.toLowerCase().trim();
}

export function matchesSearch(car: Car, query: string): boolean {
  if (!query) return true;
  
  const normalizedQuery = normalizeString(query);
  const make = normalizeString(car.make);
  const model = normalizeString(car.model);
  
  const queryClean = normalizedQuery.replace(/[-\s]/g, '');
  const makeClean = make.replace(/[-\s]/g, '');
  const modelClean = model.replace(/[-\s]/g, '');
  
  return make.includes(normalizedQuery) || 
         model.includes(normalizedQuery) ||
         makeClean.includes(queryClean) ||
         modelClean.includes(queryClean);
}
