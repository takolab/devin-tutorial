"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { queryCars, getUniqueVenues } from "@/lib/services/cars";
import { QueryResult } from "@/lib/types";
import CarCard from "./CarCard";
import FiltersPanel from "./FiltersPanel";
import SortSelect from "./SortSelect";
import Pagination from "./Pagination";
import EmptyState from "./EmptyState";

export default function HomeContent() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<QueryResult>({ items: [], total: 0, page: 1, pageSize: 12 });
  const [venues, setVenues] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      const params = {
        q: searchParams.get("q") || undefined,
        yearMin: searchParams.get("yearMin") ? parseInt(searchParams.get("yearMin")!) : undefined,
        yearMax: searchParams.get("yearMax") ? parseInt(searchParams.get("yearMax")!) : undefined,
        priceMin: searchParams.get("priceMin") ? parseInt(searchParams.get("priceMin")!) : undefined,
        priceMax: searchParams.get("priceMax") ? parseInt(searchParams.get("priceMax")!) : undefined,
        venue: searchParams.get("venue")?.split(",") || undefined,
        dateMin: searchParams.get("dateMin") || undefined,
        dateMax: searchParams.get("dateMax") || undefined,
        sort: searchParams.get("sort") as "priceAsc" | "priceDesc" | "yearDesc" | "dateAsc" | undefined || undefined,
        page: searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1,
        pageSize: searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize")!) : 12,
      };

      const [queryResult, uniqueVenues] = await Promise.all([
        queryCars(params),
        getUniqueVenues(),
      ]);

      setResult(queryResult);
      setVenues(uniqueVenues);
      setLoading(false);
    };

    loadData();
  }, [searchParams]);

  const totalPages = Math.ceil(result.total / result.pageSize);

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
            <div className="h-10 bg-gray-200 rounded w-32"></div>
            <div className="flex gap-4">
              <div className="h-10 bg-gray-200 rounded w-24"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded w-12"></div>
                    <div className="h-6 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {result.total} {result.total === 1 ? "Car" : "Cars"} Available
        </h1>
        
        <div className="flex gap-4">
          <FiltersPanel venues={venues} />
          <SortSelect />
        </div>
      </div>

      {result.items.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {result.items.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          <Pagination
            currentPage={result.page}
            totalPages={totalPages}
            totalItems={result.total}
            pageSize={result.pageSize}
          />
        </>
      )}
    </div>
  );
}
