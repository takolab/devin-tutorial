import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Gauge, Fuel, Palette, Cog } from "lucide-react";
import { getCarById, getRelatedCars } from "@/lib/services/cars";
import Carousel from "../../components/Carousel";
import PriceTag from "../../components/PriceTag";
import Badge from "../../components/Badge";
import CarCard from "../../components/CarCard";

interface CarDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: CarDetailPageProps) {
  const resolvedParams = await params;
  const car = await getCarById(resolvedParams.id);
  
  if (!car) {
    return {
      title: "Car Not Found",
    };
  }

  return {
    title: `${car.make} ${car.model} ${car.grade} (${car.year})`,
    description: car.description || `${car.make} ${car.model} ${car.grade} from ${car.year} with ${car.mileageKm.toLocaleString()} km. Starting at €${car.startingPriceEur.toLocaleString()}.`,
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const resolvedParams = await params;
  const car = await getCarById(resolvedParams.id);
  
  if (!car) {
    notFound();
  }

  const relatedCars = await getRelatedCars(car);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const specs = [
    { label: "Year", value: car.year.toString(), icon: Calendar },
    { label: "Mileage", value: `${car.mileageKm.toLocaleString()} km`, icon: Gauge },
    { label: "Transmission", value: car.transmission, icon: Cog },
    { label: "Fuel Type", value: car.fuel, icon: Fuel },
    { label: "Color", value: car.color, icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to listings
            </Link>
            <Link href="/" className="ml-8 text-2xl font-bold text-sky-500">
              AucDemo
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <Carousel 
              images={car.imageUrls} 
              alt={`${car.make} ${car.model} (${car.year})`}
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {car.make} {car.model}
              </h1>
              <p className="text-xl text-gray-600">{car.grade}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{car.year}</Badge>
              <Badge variant="default">{car.transmission}</Badge>
              <Badge variant="success">{car.fuel}</Badge>
            </div>

            <PriceTag 
              startingPrice={car.startingPriceEur} 
              expectedPrice={car.expectedPriceEur}
              className="p-4 bg-gray-50 rounded-xl"
            />

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Specifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specs.map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <div key={spec.label} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                      <Icon className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-600">{spec.label}</div>
                        <div className="font-medium text-gray-900">{spec.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Auction Details</h2>
              <div className="bg-white rounded-xl border p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{car.venue}</span>
                  <span className="text-gray-600">• Lot {car.lotNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{formatDate(car.auctionDate)}</span>
                </div>
              </div>
            </div>

            {car.description && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Description</h2>
                <p className="text-gray-700 leading-relaxed">{car.description}</p>
              </div>
            )}
          </div>
        </div>

        {relatedCars.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Related Cars</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedCars.map((relatedCar) => (
                <CarCard key={relatedCar.id} car={relatedCar} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
