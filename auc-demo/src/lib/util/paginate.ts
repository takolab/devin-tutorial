import { Car, QueryResult } from "../types";

export function paginate(cars: Car[], page: number = 1, pageSize: number = 12): QueryResult {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = cars.slice(startIndex, endIndex);
  
  return {
    items,
    total: cars.length,
    page,
    pageSize,
  };
}
