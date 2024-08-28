// asyncHandler makes it easier to manage errors in asynchronous Express route handlers by automatically forwarding errors to the next middleware

const asyncHandler = (requestHandler) => {
    // return a function with express.js requests
    return (req, res, next) => {
        // Promise Handling -  This ensures that any asynchronous operations in requestHandler are handled correctly
        Promise.resolve(requestHandler(req,res, next)).catch(
            // Error Forwarding to next middleware - 
            (err)=> next(err))
    }
}

export {asyncHandler}