import { Car, QueryParams, QueryResult } from "../types";
import { matchesSearch } from "../util/search";
import { applyFilters } from "../util/filter";
import { sortCars } from "../util/sort";
import { paginate } from "../util/paginate";

let carsCache: Car[] | null = null;

export async function getAllCars(): Promise<Car[]> {
  if (carsCache) {
    return carsCache;
  }

  try {
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/data/cars.json`, { cache: 'force-cache' });
    if (!response.ok) {
      throw new Error(`Failed to fetch cars: ${response.status}`);
    }
    const cars: Car[] = await response.json();
    carsCache = cars;
    return cars;
  } catch (error) {
    console.error('Error loading cars:', error);
    return [];
  }
}

export async function queryCars(params: QueryParams = {}): Promise<QueryResult> {
  const allCars = await getAllCars();
  
  let filteredCars = allCars;
  
  if (params.q) {
    filteredCars = filteredCars.filter(car => matchesSearch(car, params.q!));
  }
  
  filteredCars = applyFilters(filteredCars, params);
  filteredCars = sortCars(filteredCars, params.sort);
  
  const page = params.page || 1;
  const pageSize = params.pageSize || 12;
  
  return paginate(filteredCars, page, pageSize);
}

export async function getCarById(id: string): Promise<Car | null> {
  console.log('getCarById: Looking for ID:', id);
  const allCars = await getAllCars();
  console.log('getCarById: Total cars loaded:', allCars.length);
  console.log('getCarById: Available car IDs:', allCars.map(car => car.id));
  const foundCar = allCars.find(car => car.id === id) || null;
  console.log('getCarById: Found car:', foundCar);
  return foundCar;
}

export async function getRelatedCars(car: Car, limit: number = 4): Promise<Car[]> {
  const allCars = await getAllCars();
  
  const related = allCars.filter(c => 
    c.id !== car.id && (c.make === car.make || c.venue === car.venue)
  );
  
  return related.slice(0, limit);
}

export async function getUniqueVenues(): Promise<string[]> {
  const allCars = await getAllCars();
  const venues = new Set(allCars.map(car => car.venue));
  return Array.from(venues).sort();
}
