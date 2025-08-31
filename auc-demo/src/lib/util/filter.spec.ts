import { describe, it, expect } from 'vitest';
import { applyFilters } from './filter';
import { Car } from '../types';

const sampleCars: Car[] = [
  {
    id: 'LOT-2025-0001',
    make: 'Toyota',
    model: 'C-HR',
    grade: 'S GR Sport',
    year: 2019,
    mileageKm: 38500,
    transmission: 'CVT',
    fuel: 'Hybrid',
    color: 'White',
    startingPriceEur: 9800,
    expectedPriceEur: 12500,
    venue: 'Tokyo Bay',
    auctionDate: '2025-09-10',
    lotNumber: 'A-123',
    imageUrls: ['https://picsum.photos/seed/chr1/800/500'],
  },
  {
    id: 'LOT-2025-0002',
    make: 'Honda',
    model: 'Fit',
    grade: 'RS',
    year: 2020,
    mileageKm: 22000,
    transmission: 'CVT',
    fuel: 'Hybrid',
    color: 'Blue',
    startingPriceEur: 6500,
    expectedPriceEur: 8200,
    venue: 'Nagoya',
    auctionDate: '2025-09-12',
    lotNumber: 'B-045',
    imageUrls: ['https://picsum.photos/seed/fit1/800/500'],
  },
];

describe('applyFilters', () => {
  it('should return all cars when no filters applied', () => {
    const result = applyFilters(sampleCars, {});
    expect(result).toHaveLength(2);
  });

  it('should filter by year range', () => {
    const result = applyFilters(sampleCars, { yearMin: 2020 });
    expect(result).toHaveLength(1);
    expect(result[0].year).toBe(2020);
  });

  it('should filter by price range', () => {
    const result = applyFilters(sampleCars, { priceMin: 7000 });
    expect(result).toHaveLength(1);
    expect(result[0].startingPriceEur).toBe(9800);
  });

  it('should filter by venue', () => {
    const result = applyFilters(sampleCars, { venue: ['Tokyo Bay'] });
    expect(result).toHaveLength(1);
    expect(result[0].venue).toBe('Tokyo Bay');
  });

  it('should filter by date range', () => {
    const result = applyFilters(sampleCars, { dateMin: '2025-09-11' });
    expect(result).toHaveLength(1);
    expect(result[0].auctionDate).toBe('2025-09-12');
  });

  it('should apply multiple filters', () => {
    const result = applyFilters(sampleCars, { 
      yearMin: 2019, 
      priceMax: 10000,
      venue: ['Tokyo Bay', 'Nagoya']
    });
    expect(result).toHaveLength(2);
  });
});
