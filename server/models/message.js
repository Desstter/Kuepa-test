import mongoose from "mongoose";
var Schema =  mongoose.Schema

var MessageSchema = new Schema({
    from: String,
    admin: Boolean,
    message: String,
    
})

export default mongoose.model("Message", MessageSchema)