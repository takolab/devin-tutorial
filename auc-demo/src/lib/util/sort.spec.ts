import { describe, it, expect } from 'vitest';
import { sortCars } from './sort';
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

describe('sortCars', () => {
  it('should return cars in original order when no sort specified', () => {
    const result = sortCars([...sampleCars]);
    expect(result[0].id).toBe('LOT-2025-0001');
    expect(result[1].id).toBe('LOT-2025-0002');
  });

  it('should sort by price ascending', () => {
    const result = sortCars([...sampleCars], 'priceAsc');
    expect(result[0].startingPriceEur).toBe(6500);
    expect(result[1].startingPriceEur).toBe(9800);
  });

  it('should sort by price descending', () => {
    const result = sortCars([...sampleCars], 'priceDesc');
    expect(result[0].startingPriceEur).toBe(9800);
    expect(result[1].startingPriceEur).toBe(6500);
  });

  it('should sort by year newest first', () => {
    const result = sortCars([...sampleCars], 'yearDesc');
    expect(result[0].year).toBe(2020);
    expect(result[1].year).toBe(2019);
  });

  it('should sort by auction date soonest first', () => {
    const result = sortCars([...sampleCars], 'dateAsc');
    expect(result[0].auctionDate).toBe('2025-09-10');
    expect(result[1].auctionDate).toBe('2025-09-12');
  });
});
