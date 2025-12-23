import mongoose from "mongoose";

const StockSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    stockType: { type: String, required: true },
    quantity: { type: Number, required: true },
    description: { type: String },
    sku: { type: String }, // Optional unique code
    location: { type: String }, // Warehouse / Container location
    supplier: { type: String }, // Supplier / Vendor
    price: { type: Number }, // Optional pricing
    status: { type: String, default: "Available" }, // Available / Reserved / Out of Stock
    receivedDate: { type: Date }, // Stock arrival date
    expiryDate: { type: Date }, // Expiry date if applicable
    tags: [{ type: String }], // Keywords for search
  },
  { timestamps: true }
);

export default mongoose.models.Stock || mongoose.model("Stock", StockSchema);
