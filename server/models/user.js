import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    id:{type: String},
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
})
const User = mongoose.model('userSchema', userSchema);

export default User;