import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Repository } from "../models/Repository.model.js";

const createRepo = asyncHandler(async (req, res) => {
  const {
    repoName,
    repoURL,
    description,
    ownerName,
    ownerURL,
    techStack,
    languages,
    tags,
  } = req.body;

  //validating inputs
  if (
    !repoName?.trim() ||
    !repoURL?.trim() ||
    !description?.trim() ||
    !ownerName?.trim() ||
    !ownerURL?.trim()
  ) {
    throw new apiError(400, "All fields are required");
  }

  //validating tech stack
  if (!Array.isArray(techStack) || techStack.length === 0) {
    throw new apiError(400, "At least one tech stack item is required");
  }

  //validating language field
  if (!Array.isArray(languages) || languages.length === 0) {
    throw new apiError(400, "At least one language is required");
  }

  //validating tag field
  if (!Array.isArray(tags) || tags.length === 0) {
    throw new apiError(400, "At least one tag is required");
  }

  const existedRepo = await Repository.findOne({
    $or: [{ repoName }, { repoURL }],
  });

  if (existedRepo) {
    throw new apiError(409, "Repo with this data already exists");
  }

  const repoCreation = await Repository.create({
    repoName,
    repoURL,
    description,
    ownerName,
    ownerURL,
    techStack,
    languages,
    tags,
  });

  const findRepo = await Repository.findById(repoCreation._id);

  if (!findRepo) {
    throw new apiError(500, "Oops something went wrong while creating repo");
  }

  return res
    .status(201)
    .json(new apiResponse(201, findRepo, "Repo added succesfully"));
});

const getRepos = asyncHandler(async (req, res) => {
  const allRepos = await Repository.find();

  if (allRepos.length === 0) {
    return res.status(200).json(new apiResponse(200, [], "No repo exsist"));
  }

  return res
    .status(200)
    .json(new apiResponse(200, allRepos, "Repo fetch successfull"));
});

export { createRepo, getRepos };
