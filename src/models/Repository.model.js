import mongoose, { Schema } from "mongoose";

const repositorySchema = new Schema(
  {
    repoName: {
      type: String,
      required: true,
      trim: true,
    },
    repoURL: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    ownerURL: {
      type: String,
      required: true,
      trim: true,
    },
    techStack: {
      type: [String],
      required: true,
    },
    languages: {
      type: [String],
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Repository = mongoose.model("Repository", repositorySchema);
