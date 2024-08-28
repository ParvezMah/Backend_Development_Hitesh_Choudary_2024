import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
// Defining Schema and Model

const tweetSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

// Injecting Plugin 
tweetSchema.plugin(mongooseAggregatePaginate)

export const Tweet = mongoose.model("Tweet", tweetSchema)