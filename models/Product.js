import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: String,
    model: String,
    price: String,
    warranty: String,
    stockStatus: String,
    country: String,
    certifications: String,
    application: String,
    installationType: String,
    tags: String,
    seoTitle: String,
    seoMetaDescription: String,
    shortDescription: String,
    fullDescription: String,
    category: String,
    categoryFields: Object,
    images: [String], // URLs from Cloudinary
  },
  { timestamps: true }
);

// Avoid model overwrite in Next.js hot reload
export default mongoose.models.Product || mongoose.model("Product", productSchema);
