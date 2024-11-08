// the ApiError class encapsulates error details relevant to API operations with clear and structured error responses are crucial
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors=[],
        stack = "", // Optional parameter to handle the stack trace of the error
        
    ){
        super(message) // inherit and initialize properties and behavior defined in the parent class.
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false 
        this.errors = errors

        // how the stack trace of the error instance is handled:
        if(stack){
            this.stack = stack
        }
        else{
            // then capture the current stack trace-- to know where the error originated in the code.
            // Error.captureStackTrace(targetObject, constructorOpt)
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }