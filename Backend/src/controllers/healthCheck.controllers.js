import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";

// to check health of incoming HTTP request and then response
const healthcheck = asyncHandler( async (req, res)=>{
    return res
        .status(200)
        .json(new ApiResponse(200, "OK", "Health check passed"))
})

export { healthcheck }