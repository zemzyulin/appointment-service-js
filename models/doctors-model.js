import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Doctor = new Schema ({
    email: { type: String, required: true, unique: true },
    reg_token: { type: String, required: true },
    photo_avatar: { type: String, required: true },
    phone: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, default: 'doc', required: true },
    spec: { type: String, required: true },
    free: { type: Boolean, default: true, required: true },
    appointments_accepted: [ { type: String, unique: true } ]
})

export default mongoose.model('Doctor', Doctor);