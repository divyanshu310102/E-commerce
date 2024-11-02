import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      200,
      "Something went wrong while generating Access and Refresh Token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  // console.log(req.body)

  if ([userName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ email });
  

  if (existedUser) {
       throw new ApiError(200, "User with this email already exists!!")
  }

  const user = await User.create({
    userName,
    email,
    password,
    role: "user",
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(200, "Some Error Occured while registering the User");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully!!!"));
});



const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User not found!!");
    
  }

  const isPasswordValid = await user.generateAuthToken(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Wrong Password! Try Again!!");
    
  }

  const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);
  const loggedInUser = await User.findById(user._id)
  const options = {
    httpOnly: true,
    secure : true,
}

// res
// .status(200)
// .cookie("accessToken",accessToken,options)
// .cookie("refreshToken",refreshToken,options)
// .json(new ApiResponse(200, 
//   {
//     user: loggedInUser, accessToken,
//     refreshToken
// }
// , "User logged in successfully"))

res.status(200).json({
  success: true,
  message: "User logged in successfully",
  accessToken,
  refreshToken,
  user: loggedInUser,
  
})


});


const logOutUser = asyncHandler(async(req, res) => {
    
    const user = await User.findByIdAndUpdate(

        req.user._id,

        
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    // console.log(user)

    const options = {
        httpOnly: true,
        secure : true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200, {}, "User logged out successfully"))
})


// const refreshAccessToken = asyncHandler(async(req,res) =>{
//   const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
//   console.log(incomingRefreshToken)

//   if(!incomingRefreshToken){
//       throw new ApiError(401,"Unauthorized request")
//   }

//   try {
//       const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
  
//       const user = await User.findById(decodedToken?._id)
  
//       if(!user){
//           throw new ApiError(401,"Invalid Refresh Token")
//       }
  
//       if(incomingRefreshToken !== user?.refreshToken){
//           throw new ApiError(401,"refresh token expired or used")
//       }
  
//       const options = {
//           httpOnly : true,
//           secure : true
//       }
  
//        const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)
  
//        return res
//        .status(200)
//        .cookie("accessToken",accessToken,options)
//        .cookie("newRefreshToken",newRefreshToken,options)
//        .json(
//           new ApiResponse(200, 
//               {accessToken,refreshToken:newRefreshToken}, 
//               "Access token generated successfully")
//        )
//   } catch (error) {
//       throw new Error(401,error?.message || "Invalid refresh token")
//   }


// })


export { registerUser, loginUser, logOutUser};
