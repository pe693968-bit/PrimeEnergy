"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProducts } from "../context/ProductsContext";

import {
  Search,
  Sun,
  BatteryCharging,
  Zap,
  Activity,
  Layers,
  Box,
  Cable,
  Puzzle,
  ArrowDownUp,
  TrendingUp,
  TrendingDown,
  Clock
} from "lucide-react";
import Topbar from "../components/topbar";
import Footer from "../components/footer";
import { ArrowRight, PackageX } from "lucide-react";


const ProductLoader = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
      
      {/* Logo Container */}
      <div className="relative">
        {/* Pulse Ring */}
        <span className="absolute inset-0 rounded-full
                         bg-[#f2801c]/30
                         animate-ping" />

        {/* Logo */}
        <div className="relative z-10 bg-white rounded-full p-6 shadow-xl">
          <img
            src="/logo.png"
            alt="Loading"
            className="h-14 w-14 object-contain animate-spin-slow"
          />
        </div>
      </div>

      {/* Text */}
      <p className="text-gray-600 text-sm tracking-wide">
        Loading product details...
      </p>
    </div>
  );
};


const NoProductsFound = ({ onClear }) => {
  return (
    <div className="min-h-[35vh] flex flex-col items-center justify-center text-center px-4">
      
      <div className="mb-5 flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
        <Search size={30} className="text-gray-500" />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-1">
        No Products Found
      </h3>

      <p className="text-gray-600 max-w-sm mb-4">
        Try changing your search or filter to find what you're looking for.
      </p>

      <button
        onClick={onClear}
        className="relative inline-flex items-center gap-2
                   overflow-hidden bg-[#f2801c]
                   text-white font-semibold
                   py-3 px-6
                   transition-colors group"
      >
        <span className="relative z-10">Clear Filters</span>
        <ArrowRight
          size={18}
          className="relative z-10 -rotate-45
                     transition-transform duration-300
                     group-hover:rotate-0"
        />
        <span
          className="absolute inset-0 bg-black
                     translate-x-[-100%]
                     group-hover:translate-x-0
                     transition-transform duration-500"
        />
      </button>
    </div>
  );
};



const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const { products, loading } = useProducts();
  const categoryIcons = {
  All: <Layers size={16} />,
  panel: <Sun size={16} />,
  battery: <BatteryCharging size={16} />,
  inverter: <Zap size={16} />,
  vfd: <Activity size={16} />,
  mount: <Layers size={16} />,
  stand: <Box size={16} />,
  cable: <Cable size={16} />,
  accessory: <Puzzle size={16} />,
};

const handleClearFilters = () => {
setSearch("");
setSelectedCategory("All");
setSortBy("latest");
};
const sortIcons = {
  latest: <Clock size={16} />,
  "price-low": <TrendingDown size={16} />,
  "price-high": <TrendingUp size={16} />,
};

const categoryBadgeIcons = {
  panel: Sun,
  battery: BatteryCharging,
  inverter: Zap,
  vfd: Activity,
  mount: Layers,
  stand: Box,
  cable: Cable,
  accessory: Puzzle,
};




  // 🔹 Categories
  const categories = useMemo(() => {
    const cats = products.map((p) => p.category);
    return ["All", ...new Set(cats)];
  }, [products]);

  // 🔹 Filter + Search + Sort
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (search.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy === "price-low") filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sortBy === "price-high") filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    if (sortBy === "latest") filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return filtered;
  }, [products, search, selectedCategory, sortBy]);

  return (
    <>
    <Topbar/>
      <Navbar />
<div
  className="relative w-full h-[70vh] py-32 bg-cover bg-center bg-fixed flex items-center justify-center"
  style={{ backgroundImage: "url('/page-header-bg.jpg')" }}
>

  <div className='w-8 h-8 bg-white absolute bottom-0 right-8 z-50'></div>
  <div className='w-8 h-8 bg-white absolute bottom-8 right-0 z-50'></div>
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Content */}
  <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-6xl">
    
    {/* Breadcrumb */}
    <div className="flex bg-[#f2801c] p-2 px-3 rounded-2xl items-center gap-2 text-sm text-white mb-4">
      <span className="hover:text-white font-semibold cursor-pointer transition">Home</span>
      <span className="opacity-60">/</span>
      <span className="text-[white] font-semibold">Products</span>
    </div>

    {/* Title */}
    <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl leading-tight font-jakarta">
      Our Products
    </h1>

    {/* Optional Subtitle (agar chaho) */}
    <p className="text-gray-200 font-jakarta text-base sm:text-lg mt-4 max-w-2xl">
      Explore our complete range of reliable solar and renewable energy solutions
      designed for modern needs.
    </p>

  </div>
</div>

      <section className="max-w-7xl mx-auto px-4 py-10">

        {/* Header */}
       <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full md:mb-16 max-md:mb-8">
  {/* Left Content */}
  <div className="flex flex-col mb-6 lg:mb-0">
    

    <h1 className="text-black mt-9 text-4xl md:text-5xl font-bold font-jakarta leading-tight">
      Explore Our Premium
      <br />
      Energy Solutions
    </h1>
  </div>

  {/* Right Content */}
  <p className="text-gray-600 text-md w-full lg:w-1/2 text-left lg:text-right">
    Discover a wide range of high-quality solar and renewable energy products,
    designed to deliver efficiency, reliability, and long-term performance for
    residential, commercial, and industrial needs.
  </p>
</div>


        {/* Filters */}
         <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 mb-10">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between py-4">

            {/* Search */}
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg
                           pl-10 pr-4 py-2.5
                           focus:bg-white focus:outline-none
                           focus:ring-2 focus:ring-[#f2801c]"
              />
            </div>

            {/* Selects */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Select
  value={selectedCategory}
  onValueChange={setSelectedCategory}
>
  <SelectTrigger className="w-full sm:w-48">
    <SelectValue placeholder="Category" />
  </SelectTrigger>

  <SelectContent>
    {categories.map((cat) => (
      <SelectItem key={cat} value={cat}>
        <div className="flex items-center gap-2">
          {categoryIcons[cat] || <Layers size={16} />}
          <span className="capitalize">{cat}</span>
        </div>
      </SelectItem>
    ))}
  </SelectContent>
</Select>


              <Select value={sortBy} onValueChange={setSortBy}>
  <SelectTrigger className="w-full sm:w-56">
    <SelectValue placeholder="Sort by" />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="latest">
      <div className="flex items-center gap-2">
        {sortIcons.latest}
        Latest Products
      </div>
    </SelectItem>

    <SelectItem value="price-low">
      <div className="flex items-center gap-2">
        {sortIcons["price-low"]}
        Price: Low → High
      </div>
    </SelectItem>

    <SelectItem value="price-high">
      <div className="flex items-center gap-2">
        {sortIcons["price-high"]}
        Price: High → Low
      </div>
    </SelectItem>
  </SelectContent>
</Select>

            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <ProductLoader/>
        ) : filteredProducts.length === 0 ? (
          <NoProductsFound onClear={handleClearFilters} />
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {filteredProducts.map((product) => (
    <Link
      key={product._id}
      href={`/product/${product._id}`}
      className="group block"
    >
      <div
        className="relative bg-white rounded-2xl overflow-hidden
                   shadow-sm hover:shadow-xl
                   transition-all duration-500"
      >
        {/* IMAGE */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="h-full w-full object-cover
                       transition-transform duration-500
                       group-hover:scale-105"
          />

          {/* CATEGORY BADGE */}
          {product.category && (
  <span
    className="absolute top-4 left-4 flex items-center gap-1.5
               bg-white/90 backdrop-blur
               text-gray-800 text-xs px-3 py-1
               rounded-full font-medium capitalize"
  >
    {(() => {
      const Icon = categoryBadgeIcons[product.category];
      return Icon ? <Icon size={14} /> : null;
    })()}
    {product.category}
  </span>
)}

        </div>

        {/* CONTENT */}
        <div className="p-4 font-jakarta">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-1">
            {product.name}
          </h3>

          {product.price && (
            <p className="mt-2 text-lg font-bold text-[#f2801c]">
              Rs {product.price}
            </p>
          )}
        </div>

        {/* SLIDE UP BUTTON */}
        <div
          className="absolute bottom-0 left-0 w-full
                     translate-y-full group-hover:translate-y-0
                     transition-transform duration-500 ease-out"
        >
          <button
            className="w-full py-3 text-sm font-semibold
                       bg-[#f2801c] text-white
                       hover:bg-black transition-colors"
          >
            View Product Details
          </button>
        </div>
      </div>
    </Link>
  ))}
</div>



        )}
      </section>
      <Footer/>
    </>
  );
};

export default ProductsPage;
