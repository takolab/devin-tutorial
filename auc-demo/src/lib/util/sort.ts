import { Car, QueryParams } from "../types";

export function sortCars(cars: Car[], sortKey?: QueryParams["sort"]): Car[] {
  if (!sortKey) return cars;
  
  const sorted = [...cars];
  
  switch (sortKey) {
    case "priceAsc":
      return sorted.sort((a, b) => a.startingPriceEur - b.startingPriceEur);
    case "priceDesc":
      return sorted.sort((a, b) => b.startingPriceEur - a.startingPriceEur);
    case "yearDesc":
      return sorted.sort((a, b) => b.year - a.year);
    case "dateAsc":
      return sorted.sort((a, b) => a.auctionDate.localeCompare(b.auctionDate));
    default:
      return sorted;
  }
}
