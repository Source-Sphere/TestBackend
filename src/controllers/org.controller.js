import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { Org } from "../models/org.model.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerOrg = asyncHandler(async (req, res) => {
  const { orgName, orgURL, desc, techStack } = req.body;

  // Validate string fields
  if (!orgName?.trim() || !orgURL?.trim() || !desc?.trim()) {
    throw new apiError(
      400,
      "Organization name, URL and description are required"
    );
  }

  if (!Array.isArray(techStack) || techStack.length === 0) {
    throw new apiError(400, "At least one tech stack item is required");
  }

  // Check if the organization already exists by either orgName or orgURL
  const existedOrg = await Org.findOne({
    $or: [{ orgName }, { orgURL }],
  });

  if (existedOrg) {
    throw new apiError(409, "Organization already exists");
  }

  // Create a new organization document
  const orgCreation = await Org.create({
    orgName,
    orgURL,
    desc,
    techStack,
  });

  // Find the created organization document by ID
  const createdOrg = await Org.findById(orgCreation._id);

  if (!createdOrg) {
    throw new apiError(
      500,
      "Oops, something went wrong while creating the organization"
    );
  }

  return res
    .status(201)
    .json(
      new apiResponse(201, createdOrg, "Organization created successfully")
    );
});

//to get all orgs data
const getAllOrg = asyncHandler(async (req, res) => {
  const allOrgs = await Org.find();

  if (allOrgs.length === 0) {
    return res
      .status(200)
      .json(new apiResponse(200, [], "No organizations exist"));
  }

  return res
    .status(201)
    .json(new apiResponse(201, allOrgs, "All orgs fetched successfully"));
});

export { registerOrg, getAllOrg };
