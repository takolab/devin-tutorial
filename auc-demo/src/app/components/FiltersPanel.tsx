"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, Filter } from "lucide-react";

interface FiltersPanelProps {
  venues: string[];
}

export default function FiltersPanel({ venues }: FiltersPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isOpen, setIsOpen] = useState(false);
  const [yearMin, setYearMin] = useState("");
  const [yearMax, setYearMax] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
  const [dateMin, setDateMin] = useState("");
  const [dateMax, setDateMax] = useState("");

  useEffect(() => {
    setYearMin(searchParams.get("yearMin") || "");
    setYearMax(searchParams.get("yearMax") || "");
    setPriceMin(searchParams.get("priceMin") || "");
    setPriceMax(searchParams.get("priceMax") || "");
    setDateMin(searchParams.get("dateMin") || "");
    setDateMax(searchParams.get("dateMax") || "");
    
    const venueParam = searchParams.get("venue");
    setSelectedVenues(venueParam ? venueParam.split(",") : []);
  }, [searchParams]);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    
    if (yearMin) params.set("yearMin", yearMin);
    else params.delete("yearMin");
    
    if (yearMax) params.set("yearMax", yearMax);
    else params.delete("yearMax");
    
    if (priceMin) params.set("priceMin", priceMin);
    else params.delete("priceMin");
    
    if (priceMax) params.set("priceMax", priceMax);
    else params.delete("priceMax");
    
    if (selectedVenues.length > 0) params.set("venue", selectedVenues.join(","));
    else params.delete("venue");
    
    if (dateMin) params.set("dateMin", dateMin);
    else params.delete("dateMin");
    
    if (dateMax) params.set("dateMax", dateMax);
    else params.delete("dateMax");
    
    params.delete("page");
    router.replace(`/?${params.toString()}`);
    setIsOpen(false);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("yearMin");
    params.delete("yearMax");
    params.delete("priceMin");
    params.delete("priceMax");
    params.delete("venue");
    params.delete("dateMin");
    params.delete("dateMax");
    params.delete("page");
    
    router.replace(`/?${params.toString()}`);
    setIsOpen(false);
  };

  const toggleVenue = (venue: string) => {
    setSelectedVenues(prev => 
      prev.includes(venue) 
        ? prev.filter(v => v !== venue)
        : [...prev, venue]
    );
  };

  const hasActiveFilters = yearMin || yearMax || priceMin || priceMax || selectedVenues.length > 0 || dateMin || dateMax;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
          hasActiveFilters 
            ? "bg-sky-50 border-sky-200 text-sky-700" 
            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
        aria-label="Toggle filters"
      >
        <Filter className="w-4 h-4" />
        Filters
        {hasActiveFilters && (
          <span className="bg-sky-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {[yearMin, yearMax, priceMin, priceMax, dateMin, dateMax].filter(Boolean).length + selectedVenues.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Filters</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close filters"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min year"
                  value={yearMin}
                  onChange={(e) => setYearMin(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Max year"
                  value={yearMax}
                  onChange={(e) => setYearMax(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (€)</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min price"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Max price"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Venues</label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {venues.map((venue) => (
                  <label key={venue} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedVenues.includes(venue)}
                      onChange={() => toggleVenue(venue)}
                      className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{venue}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Auction Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={dateMin}
                  onChange={(e) => setDateMin(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                <input
                  type="date"
                  value={dateMax}
                  onChange={(e) => setDateMax(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button
              onClick={applyFilters}
              className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
