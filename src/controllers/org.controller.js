import { asyncHandler } from "../utils/asyncHandler.js";

const registerOrg = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "ok",
  });
});

export { registerOrg };
