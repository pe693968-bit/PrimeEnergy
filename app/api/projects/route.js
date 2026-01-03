import connect from "@/helpers/mongoose";
import Projects from "@/models/Projects";

// Connect to MongoDB
connect();

/* =========================
   GET /api/projects
========================= */
export async function GET(req) {
  try {
    const projects = await Projects.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify(projects), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    
    return new Response(
      JSON.stringify({
        message: "Failed to fetch projects",
        error: err.message,
      }),
      { status: 500 }
    );
  }
}

/* =========================
   POST /api/projects
========================= */
export async function POST(req) {
  try {
    const body = await req.json();

    const {
      title,
      type,
      capacity,
      location,
      status,
      youtubeLink,
      shortDescription,
      images,
    } = body;

    // Required validation
    if (!title || !type || !capacity || !location || !status) {
      return new Response(
        JSON.stringify({
          message:
            "Title, Type, Capacity, Location and Status are required",
        }),
        { status: 400 }
      );
    }

    const newProject = await Projects.create({
      title,
      type,
      capacity,
      location,
      status,
      youtubeLink: youtubeLink || "",
      shortDescription: shortDescription || "",
      images: images || [],
    });

    return new Response(JSON.stringify(newProject), {
      status: 201,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: "Failed to add project",
        error: err.message,
      }),
      { status: 500 }
    );
  }
}

/* =========================
   DELETE /api/projects
========================= */
export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ message: "Project ID is required" }),
        { status: 400 }
      );
    }

    const deletedProject = await Projects.findByIdAndDelete(id);

    if (!deletedProject) {
      return new Response(
        JSON.stringify({ message: "Project not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Project deleted successfully",
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: "Failed to delete project",
        error: err.message,
      }),
      { status: 500 }
    );
  }
}
