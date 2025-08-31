import { describe, it, expect } from 'vitest';
import { matchesSearch } from './search';
import { Car } from '../types';

const sampleCar: Car = {
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
  description: 'Well-maintained hybrid crossover with sporty trim.',
};

describe('matchesSearch', () => {
  it('should return true for empty query', () => {
    expect(matchesSearch(sampleCar, '')).toBe(true);
  });

  it('should match make case-insensitively', () => {
    expect(matchesSearch(sampleCar, 'toyota')).toBe(true);
    expect(matchesSearch(sampleCar, 'TOYOTA')).toBe(true);
    expect(matchesSearch(sampleCar, 'Toyota')).toBe(true);
  });

  it('should match model case-insensitively', () => {
    expect(matchesSearch(sampleCar, 'c-hr')).toBe(true);
    expect(matchesSearch(sampleCar, 'C-HR')).toBe(true);
    expect(matchesSearch(sampleCar, 'chr')).toBe(true);
  });

  it('should return false for non-matching query', () => {
    expect(matchesSearch(sampleCar, 'Honda')).toBe(false);
    expect(matchesSearch(sampleCar, 'Civic')).toBe(false);
  });

  it('should handle partial matches', () => {
    expect(matchesSearch(sampleCar, 'Toy')).toBe(true);
    expect(matchesSearch(sampleCar, 'C-H')).toBe(true);
  });
});
