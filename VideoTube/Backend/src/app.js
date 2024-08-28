import express from "express"
import cors from "cors"

const app = express();

// common middlewares
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
)
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

// import routes
import healthCheckRouter from "../../Backend/src/routes/healthcheck.routes.js"
import userRouter from "../src/controllers/user.controller.js";


// routes
app.use("/api/v1/healthcheck", healthCheckRouter)
app.use("/api/v1/users", userRouter)

export {app}