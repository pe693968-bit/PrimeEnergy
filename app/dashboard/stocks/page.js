"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Package, BarChart3, FolderKanban, Users, BadgePercent } from "lucide-react";
import LogoutButton from "@/app/components/logout";

import Link from "next/link";
export default function StocksDashboard() {
  const pathname = usePathname();

  // --- States ---
  const [stocks, setStocks] = useState([]);
  const [saving, setSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    stockType: "",
    quantity: "",
    description: "",
    sku: "",
    location: "",
    supplier: "",
    price: "",
    status: "Available",
    receivedDate: "",
    expiryDate: "",
    tags: "",
  });

  // --- Handle form input ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Fetch stocks from API ---
  const fetchStocks = async () => {
    try {
      const res = await fetch("/api/stocks");
      const data = await res.json();
      setStocks(data);
    } catch (err) {
      console.error("Failed to fetch stocks", err);
      toast.error("Failed to load stocks ❌");
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  // --- Save new stock ---
  const handleSaveStock = async () => {
    if (!formData.title || !formData.stockType || !formData.quantity) {
      toast.error("Title, Stock Type and Quantity are required!");
      return;
    }

    try {
      setSaving(true);

      const res = await fetch("/api/stocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          quantity: Number(formData.quantity),
          price: formData.price ? Number(formData.price) : undefined,
          tags: formData.tags ? formData.tags.split(",").map(t => t.trim()) : [],
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to save stock");

      setStocks((prev) => [...prev, result]);
      toast.success("Stock added successfully ✅");

      // Reset form & close dialog
      setFormData({
        title: "",
        stockType: "",
        quantity: "",
        description: "",
        sku: "",
        location: "",
        supplier: "",
        price: "",
        status: "Available",
        receivedDate: "",
        expiryDate: "",
        tags: "",
      });
      setIsDialogOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save stock ❌");
    } finally {
      setSaving(false);
    }
  };

  // --- Delete stock ---
  const handleDeleteStock = async (id) => {
    if (!confirm("Are you sure you want to delete this stock?")) return;

    try {
      const res = await fetch("/api/stocks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setStocks(stocks.filter((s) => s._id !== id));
      toast.success("Stock deleted successfully 🗑️");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete stock ❌");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#f2801c] text-white px-6 py-8 flex flex-col justify-between min-h-screen">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-3">
            <img src="/logo.png" className="w-10 h-10 bg-white rounded-full p-1" />
            <div>
              <h1 className="font-semibold">Prime Energy</h1>
              <span className="text-xs text-white/80">Admin Panel</span>
            </div>
          </div>

          <nav className="flex flex-col gap-3 text-sm">
  <Link href="/dashboard">
    <Button
      variant="ghost"
      className={`w-full justify-start ${
        pathname === "/dashboard"
          ? "bg-white text-[#f2801c]"
          : "text-white hover:bg-white/20"
      }`}
    >
      <Package size={18} /> Products
    </Button>
  </Link>

  <Link href="/dashboard/stocks">
    <Button
      variant="ghost"
      className={`w-full justify-start ${
        pathname === "/dashboard/stocks"
          ? "bg-white text-[#f2801c]"
          : "text-white hover:bg-white/20"
      }`}
    >
      <BarChart3 size={18} /> Stocks
    </Button>
  </Link>

  <Link href="/dashboard/projects">
    <Button
      variant="ghost"
      className={`w-full justify-start ${
        pathname === "/dashboard/projects"
          ? "bg-white text-[#f2801c]"
          : "text-white hover:bg-white/20"
      }`}
    >
      <FolderKanban size={18} /> Projects
    </Button>
  </Link>

  <Link href="/dashboard/team">
    <Button
      variant="ghost"
      className={`w-full justify-start ${
        pathname === "/dashboard/team"
          ? "bg-white text-[#f2801c]"
          : "text-white hover:bg-white/20"
      }`}
    >
      <Users size={18} /> Team
    </Button>
  </Link>

  <Link href="/dashboard/pricing">
    <Button
      variant="ghost"
      className={`w-full justify-start ${
        pathname === "/dashboard/pricing"
          ? "bg-white text-[#f2801c]"
          : "text-white hover:bg-white/20"
      }`}
    >
      <BadgePercent size={18} /> Pricing
    </Button>
  </Link>
</nav>

        </div>

        <LogoutButton />
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-black/70">Stocks</h2>

          {/* Add Stock Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#f2801c] hover:bg-[#d96f15]">Add Stock</Button>
            </DialogTrigger>

            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide">
              <DialogHeader>
                <DialogTitle>Add New Stock</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 gap-4 mt-4">
                <Input placeholder="Title" name="title" value={formData.title} onChange={handleChange} />
                <Input placeholder="Stock Type" name="stockType" value={formData.stockType} onChange={handleChange} />
                <Input placeholder="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} />
                <Input placeholder="SKU / Code" name="sku" value={formData.sku} onChange={handleChange} />
                <Input placeholder="Location / Warehouse" name="location" value={formData.location} onChange={handleChange} />
                <Input placeholder="Supplier / Vendor" name="supplier" value={formData.supplier} onChange={handleChange} />
                <Input placeholder="Price" name="price" value={formData.price} onChange={handleChange} />
                <Select name="status" value={formData.status} onValueChange={(val) => setFormData({ ...formData, status: val })}>
                  <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Reserved">Reserved</SelectItem>
                    <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
                 {/* Date Inputs with Labels */}
  <div className="flex flex-col gap-2">
    <Label htmlFor="receivedDate">Received Date</Label>
    <Input
      id="receivedDate"
      type="date"
      name="receivedDate"
      value={formData.receivedDate}
      onChange={handleChange}
    />
  </div>

  <div className="flex flex-col gap-2">
    <Label htmlFor="expiryDate">Expiry Date</Label>
    <Input
      id="expiryDate"
      type="date"
      name="expiryDate"
      value={formData.expiryDate}
      onChange={handleChange}
    />
  </div>
                <Textarea placeholder="Description" name="description" value={formData.description} onChange={handleChange} className="h-32" />
                <Input placeholder="Tags (comma separated)" name="tags" value={formData.tags} onChange={handleChange} />
              </div>

              <Button
                className="mt-6 bg-[#f2801c] w-full flex items-center gap-2"
                onClick={handleSaveStock}
                disabled={saving}
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving ? "Saving Stock..." : "Save Stock"}
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stocks List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {stocks?.map((stock) => (
            <div key={stock._id} className="bg-white choose-border transition overflow-hidden flex flex-col border rounded-lg shadow">
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-lg mb-1">{stock.title}</h3>
                <p className="text-sm text-gray-500">{stock.stockType}</p>
                <p className="text-base font-bold mt-2">Qty: {stock.quantity}</p>
                <p className="text-xs text-gray-400 mt-1">SKU: {stock.sku}</p>
                <p className="text-xs text-gray-400 mt-1">Location: {stock.location}</p>
                <p className="text-xs text-gray-400 mt-1">Supplier: {stock.supplier}</p>
                <p className="text-xs text-gray-400 mt-1">Price: {stock.price}</p>
                <p className="text-xs text-gray-400 mt-1">Status: {stock.status}</p>
                <p className="text-xs text-gray-400 mt-1">Received: {stock.receivedDate ? new Date(stock.receivedDate).toLocaleDateString() : "-"}</p>
                <p className="text-xs text-gray-400 mt-1">Expiry: {stock.expiryDate ? new Date(stock.expiryDate).toLocaleDateString() : "-"}</p>
                <p className="text-xs text-gray-400 mt-1">Tags: {stock.tags?.join(", ")}</p>

                <div className="border-t mt-4 pt-4 flex justify-end">
                  <Button
                    size="sm"
                    className="bg-[#f2801c] text-white rounded-sm flex items-center gap-1"
                    onClick={() => handleDeleteStock(stock._id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
