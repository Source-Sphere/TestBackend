import { asyncHandler } from "../utils/asyncHandler";

const registerOrg = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "ok",
  });
});

export { registerOrg };
