import mongoose from "mongoose";
var Schema =  mongoose.Schema

var UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('User', UserSchema);