import mongoose from "mongoose";

const PricingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  productType: String,
  capacity: { type: String, required: true },
  dailyUnits: String,
  inverterType: String,
  inverterBrand: String,
  inverterModel: String,
  price: { type: String, required: true },
  discountedPrice: String,
  discountLabel: String,
  panelsInfo: String,
  structureType: String,
  batteries: String,
  panelWarranty: String,
  inverterWarranty: String,
  installationWarranty: String,
  installationIncluded: { type: Boolean, default: false },
  netMetering: { type: Boolean, default: false },
  deliveryTime: String,
  bestSeller: { type: Boolean, default: false },
  limitedStock: String,
  expiryDate: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Pricing || mongoose.model("Pricing", PricingSchema);
