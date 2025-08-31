import { Car, QueryParams } from "../types";

export function applyFilters(cars: Car[], filters: QueryParams): Car[] {
  return cars.filter(car => {
    if (filters.yearMin && car.year < filters.yearMin) return false;
    if (filters.yearMax && car.year > filters.yearMax) return false;
    if (filters.priceMin && car.startingPriceEur < filters.priceMin) return false;
    if (filters.priceMax && car.startingPriceEur > filters.priceMax) return false;
    if (filters.venue && filters.venue.length > 0 && !filters.venue.includes(car.venue)) return false;
    if (filters.dateMin && car.auctionDate < filters.dateMin) return false;
    if (filters.dateMax && car.auctionDate > filters.dateMax) return false;
    
    return true;
  });
}
