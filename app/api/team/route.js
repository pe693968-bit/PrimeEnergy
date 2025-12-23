import connect from "@/helpers/mongoose";
import Team from "@/models/Team";
// Connect to MongoDB
connect();

/* =========================
   GET /api/team
========================= */
export async function GET(req) {
  try {
    const members = await Team.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify(members), {
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: "Failed to fetch team members",
        error: err.message,
      }),
      { status: 500 }
    );
  }
}

/* =========================
   POST /api/team
========================= */
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, profession, description, image } = body;

    // Required validation
    if (!name || !profession) {
      return new Response(
        JSON.stringify({ message: "Name and Profession are required" }),
        { status: 400 }
      );
    }

    const newMember = await Team.create({
      name,
      profession,
      description: description || "",
      image: image || "",
    });

    return new Response(JSON.stringify(newMember), {
      status: 201,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: "Failed to add team member",
        error: err.message,
      }),
      { status: 500 }
    );
  }
}

/* =========================
   DELETE /api/team
========================= */
export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ message: "Team member ID is required" }), {
        status: 400,
      });
    }

    const deletedMember = await Team.findByIdAndDelete(id);

    if (!deletedMember) {
      return new Response(JSON.stringify({ message: "Team member not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        message: "Team member deleted successfully",
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: "Failed to delete team member",
        error: err.message,
      }),
      { status: 500 }
    );
  }
}
