export type Car = {
  id: string;
  make: string;
  model: string;
  grade: string;
  year: number;
  mileageKm: number;
  transmission: "AT" | "MT" | "CVT" | "DCT" | "Other";
  fuel: "Gasoline" | "Diesel" | "Hybrid" | "EV" | "Other";
  color: string;
  startingPriceEur: number;
  expectedPriceEur?: number;
  venue: string;
  auctionDate: string;
  lotNumber: string;
  imageUrls: string[];
  description?: string;
};

export type QueryParams = {
  q?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  venue?: string[];
  dateMin?: string;
  dateMax?: string;
  sort?: "priceAsc" | "priceDesc" | "yearDesc" | "dateAsc";
  page?: number;
  pageSize?: number;
};

export type QueryResult = {
  items: Car[];
  total: number;
  page: number;
  pageSize: number;
};
