import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Gauge, Palette } from "lucide-react";
import { Car } from "@/lib/types";
import PriceTag from "./PriceTag";
import Badge from "./Badge";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="relative h-48">
        <Image
          src={car.imageUrls[0]}
          alt={`${car.make} ${car.model} (${car.year})`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {car.make} {car.model}
          </h3>
          <p className="text-sm text-gray-600">{car.grade}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{car.year}</Badge>
          <Badge variant="default">{car.transmission}</Badge>
          <Badge variant="success">{car.fuel}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Gauge className="w-4 h-4" />
            {car.mileageKm.toLocaleString()} km
          </div>
          <div className="flex items-center gap-1">
            <Palette className="w-4 h-4" />
            {car.color}
          </div>
        </div>

        <PriceTag 
          startingPrice={car.startingPriceEur} 
          expectedPrice={car.expectedPriceEur}
        />

        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {car.venue} • Lot {car.lotNumber}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(car.auctionDate)}
          </div>
        </div>

        <Link
          href={`/cars/${car.id}`}
          className="block w-full bg-sky-500 hover:bg-sky-600 text-white text-center py-2 px-4 rounded-xl font-medium transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
