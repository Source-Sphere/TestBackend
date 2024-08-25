import mongoose, { Schema } from "mongoose";

const orgSchema = new Schema(
  {
    orgName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // used for optimised searching but expensive operation
    },
    orgURL: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    availableRoles: {
      type: [String],
      required: true,
    },
    techStack: {
      type: [String],
      required: true,
    },
    uploader: {
      type: Schema.type.userId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Org = mongoose.model("Org", orgSchema);
