import connect from "@/helpers/mongoose";
import Stock from "@/models/Stock";

// Connect to MongoDB
connect();

// GET /api/stocks
export async function GET(req) {
  try {
    const stocks = await Stock.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(stocks), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "Failed to fetch stocks", error: err.message }),
      { status: 500 }
    );
  }
}

// POST /api/stocks
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      title,
      stockType,
      quantity,
      description,
      sku,
      location,
      supplier,
      price,
      status,
      receivedDate,
      expiryDate,
      tags,
    } = body;

    if (!title || !stockType || !quantity) {
      return new Response(
        JSON.stringify({ message: "Title, Stock Type, and Quantity are required" }),
        { status: 400 }
      );
    }

    const newStock = await Stock.create({
      title,
      stockType,
      quantity,
      description: description || "",
      sku: sku || "",
      location: location || "",
      supplier: supplier || "",
      price: price || 0,
      status: status || "Available",
      receivedDate: receivedDate || null,
      expiryDate: expiryDate || null,
      tags: tags || "",
    });

    return new Response(JSON.stringify(newStock), { status: 201 });
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "Failed to add stock", error: err.message }),
      { status: 500 }
    );
  }
}

// DELETE /api/stocks
export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ message: "Stock ID is required" }), { status: 400 });
    }

    const deletedStock = await Stock.findByIdAndDelete(id);
    if (!deletedStock) {
      return new Response(JSON.stringify({ message: "Stock not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Stock deleted successfully" }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "Failed to delete stock", error: err.message }),
      { status: 500 }
    );
  }
}
