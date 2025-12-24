"use client";

import React, { useEffect, useState, useMemo } from "react";
import Topbar from "../components/topbar";
import Navbar from "../components/navbar";
import { X, MapPin, Layers, Package, Info, CheckCircle, AlertTriangle, Sun, Zap, Battery, Users, Briefcase, MessageCircle } from "lucide-react";
import Footer from "../components/footer";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input, } from "@/components/ui/input";
import FaqSection from "../components/faq-section";
const ProductLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
    <div className="relative">
      <span className="absolute inset-0 rounded-full bg-[#f2801c]/30 animate-ping" />
      <div className="relative z-10 bg-white rounded-full p-6 shadow-xl">
        <img
          src="/logo.png"
          alt="Loading"
          className="h-14 w-14 object-contain animate-spin-slow"
        />
      </div>
    </div>
    <p className="text-gray-600 text-sm tracking-wide">
      Loading stock details...
    </p>
  </div>
);

/* ---------------- No Products ---------------- */
const NoProducts = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <p className="text-gray-500 text-lg">No stocks found</p>
  </div>
);

/* ---------------- Stat Card ---------------- */
const StatCard = ({ title, value, icon: Icon, color = "gray" }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 border border-gray-100 hover:shadow-xl transition">
    <div className={`p-3 rounded-xl ${color === "green" ? "bg-green-100" : color === "red" ? "bg-red-100" : "bg-gray-100"}`}>
      <Icon className={`w-6 h-6 ${color === "green" ? "text-green-600" : color === "red" ? "text-red-600" : "text-[#f2801c]"}`} />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default function ProductsPage() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState(null);

  // Filters states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const fetchStocks = async () => {
    try {
      const res = await fetch("/api/stocks");
      const data = await res.json();
      setStocks(data);
    } catch (err) {
      console.error("Failed to fetch stocks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  // Dynamic unique values from data
  const uniqueStockTypes = useMemo(() => {
    if (!stocks.length) return [];
    const types = new Set(stocks?.map(stock => stock.stockType));
    return ["All Types", ...Array.from(types)];
  }, [stocks]);

  // Filtered stocks based on search, type, and status
  const filteredStocks = useMemo(() => {
    return stocks.filter((stock) => {
      const matchesSearch =
        !searchTerm ||
        stock.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.stockType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.location?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = selectedType === "All Types" || stock.stockType === selectedType;
      const matchesStatus = selectedStatus === "All Status" || stock.status === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [stocks, searchTerm, selectedType, selectedStatus]);

  // Stats calculation
  const stats = useMemo(() => {
    if (!stocks.length) return { total: 0, available: 0, outOfStock: 0 };
    const total = stocks.length;
    const available = stocks.filter(s => s.status === "Available").length;
    const outOfStock = stocks.filter(s => s.status !== "Available").length;
    return { total, available, outOfStock };
  }, [stocks]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <Navbar />

      {/* ================= HERO ================= */}
      <div
        className="relative w-full h-[70vh] py-32 bg-cover bg-fixed bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/page-header-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center px-5 max-w-5xl">
          <div className="inline-flex bg-[#f2801c] px-5 py-3 rounded-full text-white text-sm font-semibold mb-6">
            Home / Stocks
          </div>

          <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-7xl leading-tight">
            Our Stock Inventory
          </h1>

          <p className="text-gray-200 mt-6 text-lg sm:text-xl max-w-3xl mx-auto">
            Reliable, high-quality solar and renewable energy stock solutions tailored for residential, commercial, and industrial needs.
          </p>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-16 flex flex-col gap-16">
        {/* ================= STATS ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          <StatCard title="Total Stocks" value={stats.total} icon={Layers} />
          <StatCard title="Available Now" value={stats.available} icon={CheckCircle} color="green" />
          <StatCard title="Out of Stock" value={stats.outOfStock} icon={AlertTriangle} color="red" />
          <StatCard title="Happy Clients" value="1,200+" icon={Users} />
          <StatCard title="Projects Served" value="800+" icon={Briefcase} />
          <StatCard title="Inventory Value" value="$2M+" icon={Package} />
        </div>

        {/* ================= SEARCH & FILTERS ================= */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
  {/* Search Input */}
  <Input
    type="text"
    placeholder="Search by product name, type or location..."
    className="w-full md:w-96 px-5 py-4 rounded-full border-gray-300 focus:ring-[#f2801c] shadow-sm"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  {/* Filters */}
  <div className="flex flex-wrap gap-4 items-center">
    {/* Stock Type Select */}
    <Select value={selectedType} onValueChange={setSelectedType}>
      <SelectTrigger className="w-[180px] px-5 py-4 rounded-full border-gray-300 bg-white shadow-sm">
        <SelectValue placeholder="All Types" />
      </SelectTrigger>
      <SelectContent className="max-h-60">
        <SelectGroup>
          {uniqueStockTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>

    {/* Status Select */}
    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
      <SelectTrigger className="w-[160px] px-5 py-4 rounded-full border-gray-300 bg-white shadow-sm">
        <SelectValue placeholder="All Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="All Status">All Status</SelectItem>
          <SelectItem value="Available">Available</SelectItem>
          <SelectItem value="Out of Stock">Out of Stock</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    {/* Reset Button */}
    <Button
      variant="default"
      className="px-8 py-4 bg-[#f2801c] hover:bg-orange-600 text-white rounded-full font-medium shadow-md transition"
      onClick={() => {
        setSearchTerm("");
        setSelectedType("All Types");
        setSelectedStatus("All Status");
      }}
    >
      Reset Filters
    </Button>
  </div>
</div>

        {/* ================= HEADER ================= */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black/80 mb-4 font-jakarta">
            Explore Available Stocks
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Browse our current inventory. Click on any stock item to view full details and contact us directly for inquiries.
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <ProductLoader />
          ) : filteredStocks.length === 0 ? (
            <NoProducts />
          ) : (
            filteredStocks?.map((stock) => (
              <div
                key={stock._id}
                onClick={() => setSelectedStock(stock)}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-200 hover:border-[#f2801c]/50"
              >
                {/* Image/Icon Section */}
                <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                  <Layers className="w-24 h-24 text-gray-300 group-hover:text-[#f2801c] transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span
                    className={`absolute top-4 right-4 px-4 py-1.5 text-xs font-medium rounded-full shadow-sm ${
                      stock.status === "Available"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {stock.status}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {stock.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#f2801c]" />
                    {stock.stockType}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Package className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Quantity</p>
                        <p className="font-semibold text-gray-900">{stock.quantity}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <MapPin className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="font-semibold text-gray-900">{stock.location || "Warehouse"}</p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-3 cursor-pointer bg-[#f2801c] text-white font-medium rounded-xl hover:bg-orange-600 transition flex items-center justify-center gap-2">
                    <Info className="w-4 h-4" /> View Details
                  </button>
                </div>

                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#f2801c] to-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            ))
          )}
        </div>

        {/* ================= CTA BANNER ================= */}
        <div className="bg-[#f2801c] text-white max-md:mt-10 py-16 px-8 rounded-3xl text-center shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Need Bulk Orders?</h2>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            Get special pricing and priority delivery for large quantities
          </p>
          <a
            href={`https://wa.me/923111800222?text=${encodeURIComponent(
    "Hello, I'm interested in a bulk order."
  )}`}
            target="_blank"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#f2801c] rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition"
          >
            <MessageCircle className="w-6 h-6" /> Chat on WhatsApp Now
          </a>
        </div>

        {/* ================= SIDE PANEL ================= */}
        <div
          className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#f2801c] text-white shadow-2xl transform transition-transform duration-500 z-50 ${
            selectedStock ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {selectedStock && (
            <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6 border-b border-white/30 pb-3">
                <h2 className="text-2xl font-semibold">{selectedStock.title}</h2>
                <button className="cursor-pointer" onClick={() => setSelectedStock(null)}>
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4 text-sm">
                <p><strong>Type:</strong> {selectedStock.stockType}</p>
                <p><strong>Quantity:</strong> {selectedStock.quantity}</p>
                <p><strong>Status:</strong> {selectedStock.status}</p>
                <p><strong>SKU:</strong> {selectedStock.sku || "-"}</p>
                <p><strong>Location:</strong> {selectedStock.location || "-"}</p>
                <p><strong>Supplier:</strong> {selectedStock.supplier || "-"}</p>
                <p><strong>Price:</strong> ${selectedStock.price || 0}</p>
                <p className="mt-6 text-white/90 leading-relaxed">
                  {selectedStock.description || "No description available."}
                </p>
              </div>

              <a
                 href={`https://wa.me/923111800222?text=Hello, I'm interested in ${encodeURIComponent(
    selectedStock.title
  )}`}
                target="_blank"
                className="mt-6 bg-white text-[#f2801c] text-center py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                Contact via WhatsApp
              </a>
            </div>
          )}
        </div>
      </main>
      <FaqSection/>
      <Footer />
    </div>
  );
}