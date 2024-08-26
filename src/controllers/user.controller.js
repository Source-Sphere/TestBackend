import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, githubURL, email, password } = req.body;

  if (
    !username?.trim() ||
    !githubURL?.trim() ||
    !email?.trim() ||
    !password?.trim()
  ) {
    throw new apiError(409, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ username, githubURL, email }],
  });

  if (existingUser) {
    throw new apiError(409, "User with this credintials already exsist");
  }

  const user = await User.create({
    username,
    githubURL,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new apiError(500, "Oops something went wrong");
  }

  return res
    .status(200)
    .json(new apiResponse(200, createdUser, "User created succesfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  // Check if either email or username is provided
  if (!email && !username) {
    throw new apiError(500, "Username or email is required");
  }

  // Find the user by either email or username
  const checkUser = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });

  // Check if the user exists
  if (!checkUser) {
    throw new apiError(404, "User doesn't exist");
  }

  // Verify the password
  const isPassValid = await checkUser.isPasswordCorrect(password);

  // If password is incorrect
  if (!isPassValid) {
    throw new apiError(401, "Incorrect password");
  }

  // Generate access and refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    checkUser._id
  );

  // Find the logged-in user and exclude sensitive fields
  const loggedInUser = await User.findById(checkUser._id).select(
    "-password -refreshToken"
  );

  // Cookie options
  const options = {
    httpOnly: true,
    secure: true,
  };

  // Return response with tokens and user data
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        { user: loggedInUser, refreshToken, accessToken },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiError(200, {}, "user logout succesfull"));
});

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    //pervent validations for other fields, because we are adding only one entry
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    throw new apiError(500, "Something went wrong while generating token");
  }
};

export { registerUser, loginUser, logoutUser };
