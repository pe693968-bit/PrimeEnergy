'use client'

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { usePathname } from "next/navigation";
import { Package, BarChart3, FolderKanban, Users, BadgePercent } from "lucide-react";
import LogoutButton from "../components/logout";

import Link from "next/link";

export default function Dashboard() {
  const pathname = usePathname();

  // --- Main States ---
  const [products, setProducts] = useState([]);
  const [saving, setSaving] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({ cover: "idle", img2: "idle", img3: "idle" });
const [uploadedUrls, setUploadedUrls] = useState({ cover: "", img2: "", img3: "" });
const [isUploading, setIsUploading] = useState(false);
const [cover, setcover] = useState('')
const [img2, setimg2] = useState('')
const [img3, setimg3] = useState('')


  const [category, setCategory] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    price: "",
    warranty: "",
    stockStatus: "",
    country: "",
    certifications: "",
    application: "",
    installationType: "",
    tags: "",
    seoTitle: "",
    seoMetaDescription: "",
    shortDescription: "",
    fullDescription: "",
  });

  const [categoryFields, setCategoryFields] = useState({});
  const [images, setImages] = useState({ cover: null, img2: null, img3: null });

  // --- Handle common field change ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Handle category field change ---
  const handleCategoryFieldChange = (key, value) => {
    setCategoryFields({ ...categoryFields, [key]: value });
  };

  // --- Handle image selection ---
const handleImageChange = async (e, key) => {
  const file = e.target.files[0];
  if (!file) return;

  // Set the file in images state
  setImages((prev) => ({ ...prev, [key]: file }));

  // Set upload status to uploading
  setUploadStatus((prev) => ({ ...prev, [key]: "uploading" }));
  setIsUploading(true);

  try {
    const url = await uploadImageToCloudinary(file);
    setUploadedUrls((prev) => ({ ...prev, [key]: url }));

    // Update status to done
    setUploadStatus((prev) => {
      const newStatus = { ...prev, [key]: "done" };
      const stillUploading = Object.values(newStatus).some((s) => s === "uploading");
      setIsUploading(stillUploading);
      return newStatus;
    });

  } catch (err) {
    console.error(err);
    setUploadStatus((prev) => {
      const newStatus = { ...prev, [key]: "error" };
      const stillUploading = Object.values(newStatus).some((s) => s === "uploading");
      setIsUploading(stillUploading);
      return newStatus;
    });
  }
};





  // --- Upload image to Cloudinary ---
  const uploadImageToCloudinary = async (file) => {
  if (!file) return "";

  const formData = new FormData();
  formData.append("file", file); // direct file
  formData.append("upload_preset", "education_images");

  const res = await fetch(`https://api.cloudinary.com/v1_1/dcqyrgeii/image/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "Cloudinary upload failed");
  console.log(data.secure_url
);
  
  return data.secure_url;
};

  useEffect(() => {
    console.log(images);
    
  }, [images])
  

  // --- Handle Save Product ---
const handleSaveProduct = async () => {
  try {
    setSaving(true);

    const coverUrl = await uploadImageToCloudinary(images.cover);
    const img2Url = await uploadImageToCloudinary(images.img2);
    const img3Url = await uploadImageToCloudinary(images.img3);

    const productData = {
      ...formData,
      category,
      categoryFields,
      images: [coverUrl, img2Url, img3Url],
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Failed");

    // append product
    setProducts((prev) => [...prev, result]);

    toast.success("Product added successfully ✅");

    // reset form
    setFormData({
      name: "",
      brand: "",
      model: "",
      price: "",
      warranty: "",
      stockStatus: "",
      country: "",
      certifications: "",
      application: "",
      installationType: "",
      tags: "",
      seoTitle: "",
      seoMetaDescription: "",
      shortDescription: "",
      fullDescription: "",
    });

    setCategory("");
    setCategoryFields({});
    setImages({ cover: null, img2: null, img3: null });
    setUploadStatus({ cover: "idle", img2: "idle", img3: "idle" });
  } catch (err) {
    console.error(err);
    toast.error("Failed to save product ❌");
  } finally {
    setSaving(false);
  }
};


  const fetchProducts = async () => {
  try {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  } catch (err) {
    console.error("Failed to fetch products", err);
  }
};

// Fetch products on component mount
useEffect(() => {
  fetchProducts();
}, []);



const handleDeleteProduct = async (id) => {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    const res = await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    setProducts(products.filter(p => p._id !== id));
    toast.success("Product deleted successfully 🗑️");
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete product ❌");
  }
};




  // --- Render Category Fields dynamically ---
  const renderCategoryFields = () => {
    const handle = (key) => (e) => handleCategoryFieldChange(key, e.target.value);

    switch (category) {
      case "panel":
        return (
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Panel Type (Mono / Poly / Bifacial)" onChange={handle("panelType")} />
            <Input placeholder="Power Rating (W)" onChange={handle("powerRating")} />
            <Input placeholder="Efficiency (%)" onChange={handle("efficiency")} />
            <Input placeholder="Voltage & Current (Vmp, Voc, Imp, Isc)" onChange={handle("voltageCurrent")} />
            <Input placeholder="Cell Type & Count" onChange={handle("cellTypeCount")} />
            <Input placeholder="Dimensions & Weight" onChange={handle("dimensionsWeight")} />
            <Input placeholder="Frame & Glass Type" onChange={handle("frameGlass")} />
            <Input placeholder="Temperature Coefficient" onChange={handle("temperatureCoefficient")} />
          </div>
        );

      case "battery":
        return (
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Battery Type (Lithium / Lead Acid / AGM)" onChange={handle("batteryType")} />
            <Input placeholder="Capacity (Ah / kWh)" onChange={handle("capacity")} />
            <Input placeholder="Voltage (12V / 24V / 48V)" onChange={handle("voltage")} />
            <Input placeholder="Cycle Life & DoD" onChange={handle("cycleLifeDoD")} />
            <Input placeholder="Charging Voltage" onChange={handle("chargingVoltage")} />
            <Input placeholder="Dimensions & Weight" onChange={handle("dimensionsWeight")} />
            <Input placeholder="Maintenance Required (Yes / No)" onChange={handle("maintenance")} />
          </div>
        );

      case "inverter":
        return (
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Inverter Type (On-Grid / Off-Grid / Hybrid)" onChange={handle("inverterType")} />
            <Input placeholder="Rated Power (kW)" onChange={handle("ratedPower")} />
            <Input placeholder="Input / Output Voltage" onChange={handle("inputOutputVoltage")} />
            <Input placeholder="Phase (Single / Three)" onChange={handle("phase")} />
            <Input placeholder="MPPT Count" onChange={handle("mpptCount")} />
            <Input placeholder="Efficiency (%)" onChange={handle("efficiency")} />
            <Input placeholder="Protection Features" onChange={handle("protectionFeatures")} />
            <Input placeholder="Communication (WiFi / App)" onChange={handle("communication")} />
          </div>
        );

      case "vfd":
        return (
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Power Rating (kW / HP)" onChange={handle("powerRating")} />
            <Input placeholder="Input / Output Voltage" onChange={handle("inputOutputVoltage")} />
            <Input placeholder="Phase Type" onChange={handle("phaseType")} />
            <Input placeholder="Application (Solar Pump / Motor)" onChange={handle("application")} />
            <Input placeholder="Control Method" onChange={handle("controlMethod")} />
            <Input placeholder="IP Rating" onChange={handle("ipRating")} />
            <Input placeholder="Cooling Method" onChange={handle("coolingMethod")} />
          </div>
        );

      case "mount":
        return (
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Structure Type (Ground / Rooftop / Pole)" onChange={handle("structureType")} />
            <Input placeholder="Material (GI / Aluminum / Steel)" onChange={handle("material")} />
            <Input placeholder="Wind Load Capacity" onChange={handle("windLoad")} />
            <Input placeholder="Tilt Angle" onChange={handle("tiltAngle")} />
            <Input placeholder="Panel Compatibility" onChange={handle("panelCompatibility")} />
            <Input placeholder="Coating Type" onChange={handle("coatingType")} />
          </div>
        );

      case "stand":
        return (
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Stand Type (Fixed / Adjustable)" onChange={handle("standType")} />
            <Input placeholder="Supported Panel Size" onChange={handle("supportedPanelSize")} />
            <Input placeholder="Load Capacity" onChange={handle("loadCapacity")} />
            <Input placeholder="Material" onChange={handle("material")} />
            <Input placeholder="Adjustable Angle Range" onChange={handle("angleRange")} />
            <Input placeholder="Indoor / Outdoor Use" onChange={handle("indoorOutdoor")} />
          </div>
        );

      case "cable":
        return (
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Cable Type (DC / AC / Earthing)" onChange={handle("cableType")} />
            <Input placeholder="Cable Size / Core Count" onChange={handle("cableSize")} />
            <Input placeholder="Rated Voltage" onChange={handle("ratedVoltage")} />
            <Input placeholder="Conductor / Material" onChange={handle("conductorMaterial")} />
            <Input placeholder="Insulation & Sheath" onChange={handle("insulationSheath")} />
            <Input placeholder="UV / Fire Resistance" onChange={handle("uvFireResistance")} />
            <Input placeholder="Color" onChange={handle("color")} />
          </div>
        );

      case "accessory":
        return (
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Accessory Type (MC4 / Lugs / Box)" onChange={handle("accessoryType")} />
            <Input placeholder="Compatibility" onChange={handle("compatibility")} />
          </div>
        );

      default:
        return null;
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
          <h2 className="text-3xl font-semibold text-black/70 font-jakarta">Products</h2>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#f2801c] hover:bg-[#d96f15]">Add Product</Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto scrollbar-hide">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>

              {/* COMMON FIELDS */}
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Product Name" name="name" onChange={handleChange} />
                <Input placeholder="Brand / Manufacturer" name="brand" onChange={handleChange} />
                <Select onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="panel">Solar Panel</SelectItem>
                    <SelectItem value="battery">Solar Battery</SelectItem>
                    <SelectItem value="inverter">Solar Inverter</SelectItem>
                    <SelectItem value="vfd">VFD</SelectItem>
                    <SelectItem value="mount">Mounting Structure</SelectItem>
                    <SelectItem value="stand">Stand</SelectItem>
                    <SelectItem value="cable">Solar Cable</SelectItem>
                    <SelectItem value="accessory">Accessory</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Model / SKU" name="model" onChange={handleChange} />
                <Input placeholder="Price / Contact for Price" name="price" onChange={handleChange} />
                <Input placeholder="Warranty" name="warranty" onChange={handleChange} />
                <Input placeholder="Stock Status / Availability" name="stockStatus" onChange={handleChange} />
                <Input placeholder="Country of Origin" name="country" onChange={handleChange} />
                <Input placeholder="Certifications (IEC, TUV, CE, ISO)" name="certifications" onChange={handleChange} />
                <Input placeholder="Application / Use Case" name="application" onChange={handleChange} />
                <Input placeholder="Installation Type (Indoor / Outdoor)" name="installationType" onChange={handleChange} />
                <Input placeholder="Tags / Keywords (SEO)" name="tags" onChange={handleChange} />
                <Input placeholder="SEO Title" name="seoTitle" onChange={handleChange} />
                <Input placeholder="SEO Meta Description" name="seoMetaDescription" onChange={handleChange} />
              </div>

              <Textarea placeholder="Short Description" name="shortDescription" className="mt-4" onChange={handleChange} />
              <Textarea placeholder="Full Description" name="fullDescription" className="mt-4" onChange={handleChange} />

              {/* IMAGES */}
              <div className="grid grid-cols-1 gap-6">
  {["cover", "img2", "img3"].map((key, idx) => (
    <div key={key} className="border rounded-xl p-4 flex flex-col gap-3 hover:border-[#f2801c] transition">
      <span className="text-xs font-medium text-[#f2801c]">{key === "cover" ? "Cover Image" : "Gallery Image"}</span>
      <Label className="text-sm font-medium">{key === "cover" ? "Main Product Image" : `Image ${idx + 1}`}</Label>
      <Input type="file" accept="image/*" onChange={(e) => handleImageChange(e, key)} />
      {uploadStatus[key] === "uploading" && <span className="text-blue-500 text-sm">Uploading...</span>}
      {uploadStatus[key] === "done" && <span className="text-green-500 text-sm">Uploaded ✅</span>}
      {uploadStatus[key] === "error" && <span className="text-red-500 text-sm">Upload failed ❌</span>}
    </div>
  ))}
</div>


              {/* CATEGORY FIELDS */}
              <div className="mt-6">
                <Label className="mb-2 block">Category Specific Fields</Label>
                {renderCategoryFields()}
              </div>

              <Button
  className="mt-6 bg-[#f2801c] w-full flex items-center gap-2"
  onClick={handleSaveProduct}
  disabled={saving || isUploading}
>
  {(saving || isUploading) && (
    <Loader2 className="w-4 h-4 animate-spin" />
  )}
  {saving ? "Saving Product..." : isUploading ? "Uploading Images..." : "Save Product"}
</Button>


            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
  {products.map((product) => (
    <div
      key={product._id}
      className="bg-white choose-border  transition overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={product.images?.[0] || "/placeholder.jpg"}
          alt={product.name}
          className="h-44 w-full object-cover"
        />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-[#f2801c] text-white text-xs px-3 py-1 rounded-full capitalize">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-semibold text-base leading-tight mb-1 line-clamp-2">
          {product.name}
        </h3>

        {/* Brand & Model */}
        <p className="text-xs text-gray-500">
          {product.brand} {product.model && `• ${product.model}`}
        </p>

        {/* Price */}
        <p className="text-lg font-bold text-[#f2801c] mt-2">
          {product.price}
        </p>

        {/* Stock Status */}
        {product.stockStatus && (
          <span
            className={`inline-block w-fit mt-2 text-xs px-2 py-1 rounded-full ${
              product.stockStatus.toLowerCase().includes("out")
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {product.stockStatus}
          </span>
        )}

        {/* Divider */}
        <div className="border-t mt-4 pt-4 flex items-center justify-between">
          {/* Country / Warranty */}
          <span className="text-xs text-gray-400">
            {product.country || "—"} • {product.warranty || "No warranty"}
          </span>

          {/* Delete Button */}
          <Button
  size="sm"
  className="bg-[#f2801c] hover:bg-[#d96f15] text-white rounded-sm"
  onClick={() => handleDeleteProduct(product._id)}
>
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
