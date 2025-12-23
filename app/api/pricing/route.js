import connect from "@/helpers/mongoose";
import Pricing from "@/models/Pricing";

// Connect to MongoDB
connect();

/* =========================
   GET /api/pricing
========================= */
export async function GET(req) {
  try {
    const offers = await Pricing.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify(offers), {
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: "Failed to fetch pricing offers",
        error: err.message,
      }),
      { status: 500 }
    );
  }
}

/* =========================
   POST /api/pricing
========================= */
export async function POST(req) {
  try {
    const body = await req.json();

    const {
      title,
      description,
      productType,
      capacity,
      dailyUnits,
      inverterType,
      inverterBrand,
      inverterModel,
      price,
      discountedPrice,
      discountLabel,
      panelsInfo,
      structureType,
      batteries,
      panelWarranty,
      inverterWarranty,
      installationWarranty,
      installationIncluded,
      netMetering,
      deliveryTime,
      bestSeller,
      limitedStock,
      expiryDate,
    } = body;

    // Required validation
    if (!title || !capacity || !price) {
      return new Response(
        JSON.stringify({
          message: "Title, Capacity, and Price are required",
        }),
        { status: 400 }
      );
    }

    const newOffer = await Pricing.create({
      title,
      description: description || "",
      productType: productType || "",
      capacity,
      dailyUnits: dailyUnits || "",
      inverterType: inverterType || "",
      inverterBrand: inverterBrand || "",
      inverterModel: inverterModel || "",
      price,
      discountedPrice: discountedPrice || "",
      discountLabel: discountLabel || "",
      panelsInfo: panelsInfo || "",
      structureType: structureType || "",
      batteries: batteries || "",
      panelWarranty: panelWarranty || "",
      inverterWarranty: inverterWarranty || "",
      installationWarranty: installationWarranty || "",
      installationIncluded: installationIncluded || false,
      netMetering: netMetering || false,
      deliveryTime: deliveryTime || "",
      bestSeller: bestSeller || false,
      limitedStock: limitedStock || "",
      expiryDate: expiryDate || "",
      createdAt: new Date(),
    });

    return new Response(JSON.stringify(newOffer), {
      status: 201,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: "Failed to add pricing offer",
        error: err.message,
      }),
      { status: 500 }
    );
  }
}

/* =========================
   DELETE /api/pricing
========================= */
export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ message: "Offer ID is required" }),
        { status: 400 }
      );
    }

    const deletedOffer = await Pricing.findByIdAndDelete(id);

    if (!deletedOffer) {
      return new Response(
        JSON.stringify({ message: "Offer not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Offer deleted successfully",
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: "Failed to delete offer",
        error: err.message,
      }),
      { status: 500 }
    );
  }
}
