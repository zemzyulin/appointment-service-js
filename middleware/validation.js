import User from "../models/users-model.js";
import Doctor from "../models/doctors-model.js";
import Appointment from "../models/appointments-model.js";

// user id validation middleware
export async function validateUser(req, res, next) {
    try {
        let id = req.body.user || req.params.id;
        res.locals.user = await User.findOne({ _id: id }, { reg_token: 0 });
        if (!res.locals.user) {
            return res.status(404).send({ message: 'User not found' });
        } else {
            next();
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

// doctor id validation middleware
export async function validateDoctor(req, res, next) {
    try {
        let id = req.body.doctor || req.params.id;
        res.locals.doctor = await Doctor.findOne({ _id: id }, { reg_token: 0 });
        if (!res.locals.doctor) {
            return res.status(404).send({ message: 'Doctor not found' });
        } else {
            next();
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

// appointment id validation middleware
export async function validateAppointment(req, res, next) {
    try {
        let id = req.params.id;
        res.locals.appointment = await Appointment.findOne({ _id: id }, { reg_token: 0 });
        if (!res.locals.appointment) {
            return res.status(404).send({ message: 'Appointment not found' });
        } else {
            next();
        }
    } catch (error) {
        res.status(400).send(error);
    }
}