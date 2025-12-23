"use client";

import { useState, useEffect } from "react";
import { 
  Loader2, Package, Zap, Battery, Clock, Calendar, MapPin, 
  ShieldCheck, Star, AlertCircle, ChevronDown, ChevronUp 
} from "lucide-react";

export default function PricingSection() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({}); // Track which cards have expanded description

  const whatsappNumber = "923111800222";

  useEffect(() => {
    async function fetchOffers() {
      try {
        const res = await fetch("/api/pricing");
        if (!res.ok) throw new Error("Failed to fetch pricing data");
        const data = await res.json();
        setOffers(data);
      } catch (err) {
        console.error("Failed to fetch offers:", err);
        setError("Unable to load packages. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchOffers();
  }, []);

  // Toggle description expansion
  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const MAX_DESC_LENGTH = 80; // Characters after which we truncate

  // Skeleton loader
  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
      {[...Array(3)].map((_, i) => (
        <div 
          key={i} 
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse h-full"
        >
          <div className="h-56 bg-gray-100"></div>
          <div className="p-7 space-y-5">
            <div className="h-7 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="space-y-3">
              <div className="h-5 bg-gray-200 rounded w-full"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="pt-4">
              <div className="h-10 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="pb-10 md:pb-28 ">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 font-semibold text-sm rounded-full mb-4">
            Solar Solutions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
            Affordable & Reliable Solar Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect solar system for your home or business with transparent pricing and expert installation.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mb-12 p-6 bg-red-50 border border-red-200 rounded-xl text-center">
            <AlertCircle className="mx-auto h-10 w-10 text-red-500 mb-3" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Main Content */}
        {loading ? (
          renderSkeleton()
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 ">
            {offers.map((offer) => {
              const isBestSeller = offer.bestSeller;
              const hasDiscount = !!offer.discountedPrice;
              const description = offer.description || "";
              const isLongDescription = description.length > MAX_DESC_LENGTH;
              const isExpanded = expanded[offer._id] || false;
              const displayDesc = isLongDescription && !isExpanded 
                ? description.substring(0, MAX_DESC_LENGTH) + "..." 
                : description;

              return (
                <div
                  key={offer._id}
                  className={`relative max-md:mb-10 bg-white rounded-2xl shadow-lg border transition-all duration-300 overflow-hidden flex flex-col
                    ${isBestSeller 
                      ? 'border-2 border-orange-500 scale-[1.03] md:scale-105 shadow-orange-200/50' 
                      : 'border-gray-100 hover:shadow-xl hover:-translate-y-1'
                    }`}
                >
                  {/* Ribbon for Best Seller */}
                  {isBestSeller && (
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 bg-orange-500 text-white text-xs font-bold px-10 py-1 rotate-45 shadow-md">
                      BEST SELLER
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-7 flex flex-col flex-grow">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {offer.title}
                      </h3>
                      <div className="relative">
                        <p className={`text-gray-600 text-base leading-relaxed ${isLongDescription ? 'max-h-24 overflow-hidden' : ''}`}>
                          {displayDesc}
                        </p>

                        {isLongDescription && (
                          <button
                            onClick={() => toggleExpand(offer._id)}
                            className="absolute -bottom-7  right-0 text-orange-600 font-medium text-sm flex items-center gap-1 hover:underline"
                          >
                            {isExpanded ? "Show Less" : "Read More"}
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        )}
                      </div>

                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-orange-600">
                        <Zap size={18} />
                        <span>{offer.productType}</span>
                      </div>
                    </div>

                    {/* Key Specs */}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div className="flex items-start gap-3">
                        <Package size={18} className="text-gray-700 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-800">Panels</p>
                          <p className="text-gray-600">{offer.panelsInfo}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Zap size={18} className="text-gray-700 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-800">Inverter</p>
                          <p className="text-gray-600">
                            {offer.inverterBrand} {offer.inverterModel}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Battery size={18} className="text-gray-700 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-800">Batteries</p>
                          <p className="text-gray-600">{offer.batteries || "Not Included"}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock size={18} className="text-gray-700 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-800">Daily Units</p>
                          <p className="text-gray-600">{offer.dailyUnits}</p>
                        </div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-extrabold text-[#f2801c]">
                          {offer.discountedPrice 
                            ? `PKR ${offer.discountedPrice.toLocaleString()}`
                            : `PKR ${offer.price.toLocaleString()}`}
                        </span>
                        {hasDiscount && (
                          <span className="text-xl text-gray-400 line-through">
                            PKR {offer.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {offer.discountLabel && (
                        <span className="inline-block mt-2 bg-orange-100 text-[#f2801c] text-sm font-semibold px-3 py-1 rounded-full">
                          {offer.discountLabel}
                        </span>
                      )}
                    </div>

                    {/* Warranty & Installation */}
                    <div className="mb-6 space-y-2 text-sm">
                      <div className="flex items-center gap-3 text-gray-700">
                        <ShieldCheck size={18} />
                        <span>Installation: {offer.installationIncluded ? "Included" : "Not Included"}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Calendar size={18} />
                        <span>Panel Warranty: {offer.panelWarranty}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Calendar size={18} />
                        <span>Inverter Warranty: {offer.inverterWarranty}</span>
                      </div>
                    </div>

                    {/* Extra Info */}
                    <div className="text-sm text-gray-600 space-y-2 mb-8">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>Delivery: {offer.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star size={16} />
                        <span>Net Metering: {offer.netMetering ? "Available" : "Not Available"}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=Hello,%20I'm%20interested%20in%20${encodeURIComponent(offer.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-all shadow-md hover:shadow-lg text-base"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 2.14.69 4.11 1.86 5.74L2 22l4.26-1.86C7.89 21.31 9.93 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
                      </svg>
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}