import { describe, it, expect, beforeEach, vi } from 'vitest';
import { queryCars, getCarById } from './cars';

const mockCars = [
  {
    id: 'LOT-2025-0001',
    make: 'Toyota',
    model: 'C-HR',
    grade: 'S GR Sport',
    year: 2019,
    mileageKm: 38500,
    transmission: 'CVT' as const,
    fuel: 'Hybrid' as const,
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
    transmission: 'CVT' as const,
    fuel: 'Hybrid' as const,
    color: 'Blue',
    startingPriceEur: 6500,
    expectedPriceEur: 8200,
    venue: 'Nagoya',
    auctionDate: '2025-09-12',
    lotNumber: 'B-045',
    imageUrls: ['https://picsum.photos/seed/fit1/800/500'],
  },
];

global.fetch = vi.fn();

describe('cars service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockCars),
    });
  });

  describe('queryCars', () => {
    it('should return all cars when no params provided', async () => {
      const result = await queryCars();
      
      expect(result.items).toHaveLength(2);
      expect(result.total).toBe(2);
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(12);
    });

    it('should filter cars by search query', async () => {
      const result = await queryCars({ q: 'Toyota' });
      
      expect(result.items).toHaveLength(1);
      expect(result.items[0].make).toBe('Toyota');
    });

    it('should filter cars by year', async () => {
      const result = await queryCars({ yearMin: 2020 });
      
      expect(result.items).toHaveLength(1);
      expect(result.items[0].year).toBe(2020);
    });

    it('should sort cars by price', async () => {
      const result = await queryCars({ sort: 'priceAsc' });
      
      expect(result.items[0].startingPriceEur).toBe(6500);
      expect(result.items[1].startingPriceEur).toBe(9800);
    });

    it('should paginate results', async () => {
      const result = await queryCars({ page: 1, pageSize: 1 });
      
      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(2);
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(1);
    });
  });

  describe('getCarById', () => {
    it('should return car when found', async () => {
      const car = await getCarById('LOT-2025-0001');
      
      expect(car).toBeTruthy();
      expect(car?.id).toBe('LOT-2025-0001');
      expect(car?.make).toBe('Toyota');
    });

    it('should return null when car not found', async () => {
      const car = await getCarById('NON-EXISTENT');
      
      expect(car).toBeNull();
    });
  });
});
