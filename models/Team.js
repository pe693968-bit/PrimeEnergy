import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    profession: { type: String, required: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const Team = mongoose.models.Team || mongoose.model("Team", TeamSchema);

export default Team;
