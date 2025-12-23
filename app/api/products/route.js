import connect from "@/helpers/mongoose";
import Product from "@/models/Product";

export async function POST(req) {
  try {
    await connect();

    const body = await req.json(); // req body me product data
    const newProduct = new Product(body);
    const savedProduct = await newProduct.save();

    return new Response(JSON.stringify(savedProduct), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Failed to save product", error: err.message }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connect();

    const products = await Product.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Failed to fetch products", error: err.message }),
      { status: 500 }
    );
  }
}

// DELETE product by sending { id } in request body
export async function DELETE(req) {
  try {
    await connect();

    const { id } = await req.json(); // read id from request body
    if (!id) {
      return new Response(JSON.stringify({ message: "Product ID is required" }), { status: 400 });
    }

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return new Response(JSON.stringify({ message: "Product not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Product deleted successfully", id }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Failed to delete product", error: err.message }),
      { status: 500 }
    );
  }
}
