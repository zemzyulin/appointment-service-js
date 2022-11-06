import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Appointment = new Schema ({
    date: { type: Date, required: true },
    user: { type: String, required: true },
    doctor: { type: String, required: true },
    active: { type: Boolean, default: true, required: true },
})

export default mongoose.model('Appointment', Appointment);