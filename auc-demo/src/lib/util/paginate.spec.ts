import { describe, it, expect } from 'vitest';
import { paginate } from './paginate';
import { Car } from '../types';

const createSampleCars = (count: number): Car[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `LOT-2025-${String(i + 1).padStart(4, '0')}`,
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
  }));
};

describe('paginate', () => {
  it('should return correct page data for first page', () => {
    const cars = createSampleCars(25);
    const result = paginate(cars, 1, 12);
    
    expect(result.items).toHaveLength(12);
    expect(result.total).toBe(25);
    expect(result.page).toBe(1);
    expect(result.pageSize).toBe(12);
  });

  it('should return correct page data for middle page', () => {
    const cars = createSampleCars(25);
    const result = paginate(cars, 2, 12);
    
    expect(result.items).toHaveLength(12);
    expect(result.total).toBe(25);
    expect(result.page).toBe(2);
    expect(result.pageSize).toBe(12);
  });

  it('should return correct page data for last page', () => {
    const cars = createSampleCars(25);
    const result = paginate(cars, 3, 12);
    
    expect(result.items).toHaveLength(1);
    expect(result.total).toBe(25);
    expect(result.page).toBe(3);
    expect(result.pageSize).toBe(12);
  });

  it('should handle empty array', () => {
    const result = paginate([], 1, 12);
    
    expect(result.items).toHaveLength(0);
    expect(result.total).toBe(0);
    expect(result.page).toBe(1);
    expect(result.pageSize).toBe(12);
  });

  it('should handle page beyond available data', () => {
    const cars = createSampleCars(5);
    const result = paginate(cars, 2, 12);
    
    expect(result.items).toHaveLength(0);
    expect(result.total).toBe(5);
    expect(result.page).toBe(2);
    expect(result.pageSize).toBe(12);
  });
});
