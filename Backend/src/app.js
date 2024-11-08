import express from "express"
import cors from "cors"
import path from 'path';

const app = express();

// common middlewares
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: true
    })
)
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
// app.use(express.static(path.join(__dirname, 'public')));


// import routes
import healthCheckRouter from "../../Backend/src/routes/healthcheck.routes.js"
import userRouter from "../src/controllers/user.controller.js";


// routes
app.use("/api/v1/healthcheck", healthCheckRouter)
app.use("/api/v1/users", userRouter)

export {app}