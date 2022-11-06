import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema ({
    email: { type: String, required: true, unique: true },
    reg_token: { type: String, required: true },
    photo_avatar: { type: String, required: true },
    phone: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, default: 'user', required: true },
    appointments: [ { type: String, unique: true } ]
})

export default mongoose.model('User', User);