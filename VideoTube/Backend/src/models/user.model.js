import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Defining a Schema
const userSchema = new Schema(
    {
        username : {
            type: String, 
            required: true, 
            unique: true, 
            lowercase: true, 
            trim: true, 
            index: true
        },
        email : {
            type: String, 
            required: true, 
            unique: true, 
            lowercase: true, 
            trim: true
        },
        fullname: {
            type: String, 
            required: true, 
            index: true, 
            trim: true
        },
        avatar: {
            type: String, // Claudinary URL
            required: true,
        },
        coverImage: {
            type: String, // Claudinary URL
        },
        watchHistory : [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            }
        ],
        password: {
            type: String,
            required: [true, "password is required"]
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

// Injecting Plugin - mongooseAggregatePaginate plugin, which would enable pagination for aggregate queries.
userSchema.plugin(mongooseAggregatePaginate)


// pre-save hook
userSchema.pre("save", async function (next) {
    if(!this.modified("password")) return next()
    this.password = bcrypt.hash(this.password, 10)
    next()
})

// mongoose instance methods
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// mongoose instance methods
userSchema.methods.generateAccessToken = function(){
    // short lived access token
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn : process.env.ACCESS_TOKEN_EXPIRY}
    )
}

// mongoose instance methods
userSchema.methods.generateRefreshToken = function(){
    // short lived access token
    jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn : process.env.REFRESH_TOKEN_EXPIRY}
    )
}

// compiling our schema into a Model.
export const User = mongoose.model("User", userSchema)