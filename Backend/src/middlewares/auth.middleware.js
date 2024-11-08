// this middleware is for handling authentication and authorization using JSON Web Tokens (JWTs)


import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        // token is a variable that holds the JWT (JSON Web Token) extracted from the request
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") // Normalization : When verifying or processing JWTs on the server side, it's common to remove this prefix "Bearer" before actual verification.

        
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
        
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) // ACCESS_TOKEN_SECRET is a secret key used to verify the JWT's signature and ensure it hasn't been tampered with.
        console.log("Decoded : ", decodedToken);
     
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken") // selects all fields excluded password and refreshToken from the returned user object.

    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        // put authenticated user to req.user
        req.user = user;
        // passes control to the next middleware function
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})