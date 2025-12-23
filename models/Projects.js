import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["Residential", "Commercial", "Industrial"],
      required: true,
    },

    capacity: {
      type: String, // "10kW"
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Completed", "Ongoing"],
      required: true,
    },

    shortDescription: {
      type: String,
      maxlength: 300,
    },

    youtubeLink: {
      type: String,
    },

    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
