"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
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
import { usePathname } from "next/navigation";
import {
  Trash2,
  Loader2,
  Package,
  BarChart3,
  FolderKanban,
  Users,
  BadgePercent,
} from "lucide-react";
import LogoutButton from "@/app/components/logout";
import Link from "next/link";

export default function PricingDashboard() {
  const pathname = usePathname();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    productType: "",
    capacity: "",
    dailyUnits: "",
    inverterType: "",
    inverterBrand: "",
    inverterModel: "",
    price: "",
    discountedPrice: "",
    discountLabel: "",
    panelsInfo: "",
    structureType: "",
    batteries: "",
    panelWarranty: "",
    inverterWarranty: "",
    installationWarranty: "",
    installationIncluded: false,
    netMetering: false,
    deliveryTime: "",
    bestSeller: false,
    limitedStock: "",
    expiryDate: "",
  });

  /* ================= FETCH OFFERS ================= */
  useEffect(() => {
    async function fetchOffers() {
      try {
        const res = await fetch("/api/pricing");
        if (!res.ok) throw new Error("Failed to fetch offers");
        const data = await res.json();
        setOffers(data);
      } catch (err) {
        toast.error("Failed to load pricing offers");
      } finally {
        setLoading(false);
      }
    }
    fetchOffers();
  }, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  /* ================= SAVE OFFER ================= */
  const handleSaveOffer = async () => {
    if (!formData.title || !formData.capacity || !formData.price) {
      toast.error("Title, Capacity and Price are required");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add offer");
      const newOffer = await res.json();

      setOffers([...offers, newOffer]);
      toast.success("Pricing offer added ✅");

      setFormData({
        title: "",
        description: "",
        productType: "",
        capacity: "",
        dailyUnits: "",
        inverterType: "",
        inverterBrand: "",
        inverterModel: "",
        price: "",
        discountedPrice: "",
        discountLabel: "",
        panelsInfo: "",
        structureType: "",
        batteries: "",
        panelWarranty: "",
        inverterWarranty: "",
        installationWarranty: "",
        installationIncluded: false,
        netMetering: false,
        deliveryTime: "",
        bestSeller: false,
        limitedStock: "",
        expiryDate: "",
      });

      setDialogOpen(false);
    } catch (err) {
      toast.error("Failed to add offer ❌");
    } finally {
      setSaving(false);
    }
  };

  /* ================= DELETE OFFER ================= */
  const handleDeleteOffer = async (id) => {
    if (!confirm("Delete this pricing offer?")) return;

    try {
      const res = await fetch("/api/pricing", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error();
      setOffers(offers.filter((o) => o.id !== id));
      toast.success("Offer deleted ✅");
    } catch {
      toast.error("Failed to delete offer ❌");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* ================= SIDEBAR ================= */}
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

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-8">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-semibold">Pricing Offers</h1>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#f2801c]">Add Offer</Button>
            </DialogTrigger>

            <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Pricing Offer</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 gap-4">
                <Input name="title" placeholder="Offer Title" onChange={handleChange} />
                <Textarea name="description" placeholder="Short Description" onChange={handleChange} />
                <Input name="capacity" placeholder="System Capacity (kW)" onChange={handleChange} />
                <Input name="dailyUnits" placeholder="Daily Units" onChange={handleChange} />
                <Input name="inverterType" placeholder="Inverter Type" onChange={handleChange} />
                <Input name="inverterBrand" placeholder="Inverter Brand" onChange={handleChange} />
                <Input name="inverterModel" placeholder="Inverter Model" onChange={handleChange} />
                <Input name="price" placeholder="Original Price" onChange={handleChange} />
                <Input name="discountedPrice" placeholder="Discounted Price" onChange={handleChange} />
                <Input name="discountLabel" placeholder="Discount Label" onChange={handleChange} />
                <Textarea name="panelsInfo" placeholder="Panels Information" onChange={handleChange} />
                <Input name="structureType" placeholder="Structure Type" onChange={handleChange} />
                <Input name="batteries" placeholder="Batteries (optional)" onChange={handleChange} />
                <Input name="deliveryTime" placeholder="Delivery Time" onChange={handleChange} />
                <Input name="limitedStock" placeholder="Limited Stock Text" onChange={handleChange} />
                <Input name="expiryDate" type="date" onChange={handleChange} />

                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="installationIncluded" onChange={handleChange} />
                  Installation Included
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="netMetering" onChange={handleChange} />
                  Net Metering Support
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="bestSeller" onChange={handleChange} />
                  Mark as Best Seller
                </label>
              </div>

              <Button
                onClick={handleSaveOffer}
                disabled={saving}
                className="mt-6 bg-[#f2801c] w-full"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Save Offer
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* ================= OFFER CARDS ================= */}
        {loading ? (
          <p className="text-center text-gray-400">Loading offers...</p>
        ) : offers.length === 0 ? (
          <p className="text-center text-gray-400">No pricing offers added</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div key={offer.id} className="border p-5 rounded-lg bg-white shadow-sm">
                <h3 className="font-semibold text-lg">{offer.title}</h3>
                <p className="text-sm text-gray-500">{offer.capacity}</p>
                <p className="mt-2 text-[#f2801c] font-bold">
                  PKR {offer.discountedPrice || offer.price}
                </p>

                {offer.bestSeller && (
                  <span className="inline-block mt-2 text-xs bg-[#f2801c] text-white px-2 py-1 rounded">
                    Best Seller
                  </span>
                )}

                <Button
                  onClick={() => handleDeleteOffer(offer.id)}
                  size="sm"
                  className="mt-4 bg-[#f2801c] w-full"
                >
                  <Trash2 size={16} /> Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
