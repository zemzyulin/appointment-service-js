import Appointment from "../models/appointments-model.js";
import User from "../models/users-model.js";
import Doctor from "../models/doctors-model.js";

// list all appointments
export async function getAll(req, res) {
    try {
        let result = await Appointment.find();
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
}

// add appointment
export async function addOne(req, res) {
    try {
        let { date, active } = req.body;
        let appDate = Date.parse(date);

        // validate date
        if (!appDate) {
            return res.status(400).send({ message: 'Incorrect date' })
        }
        
        // check past date: if true --> add inactive appointment
        if (appDate < Date.now() || active === false) {
            req.body.active = false;
            let inactiveAppointment = await Appointment.create(req.body);
            await updateUserDoctor(inactiveAppointment, 'push');
            return res.status(200).send(inactiveAppointment);
        }

        // check if doctor already has 3 appointments
        let activeApps = await Appointment.find({ doctor: res.locals.doctor.id, active: true });
        let activeAppsToday = activeApps.filter(el => normalizeDate(el.date) === normalizeDate(appDate));
        if (activeAppsToday.length > 2) {
            return res.status(400).send({ message: 'Doctor already has 3 appointments on this day' })
        }

        // add appointment
        let appointment = await Appointment.create(req.body);
        await updateUserDoctor(appointment, 'push');
        res.status(200).send(appointment);
    } catch (error) {
        res.status(400).send(error);
    }
}

// list one appointment
export async function getOne(req, res) {
    try {
        res.status(200).send(res.locals.appointment);
    } catch (error) {
        res.status(400).send(error);
    }
}

// delete one appointment
export async function deleteOne(req, res) {
    try {
        let appointment = await Appointment.findByIdAndRemove(req.params.id);
        await updateUserDoctor(appointment, 'pull');
        res.status(204).send();
    } catch (error) {
        res.status(400).send(error);
    }
}


// helper functions
async function updateUserDoctor(appointment, action) {
    try {
        let { user, doctor } = appointment;
        if (action === 'push') {
            await User.findByIdAndUpdate( user, { $push: { appointments: appointment.id } } );
            await Doctor.findByIdAndUpdate( doctor, { $push: { appointments_accepted: appointment.id } } );
        }
        if (action === 'pull') {
            await User.findByIdAndUpdate( user, { $pull: { appointments: appointment.id } } );
            await Doctor.findByIdAndUpdate( doctor, { $pull: { appointments_accepted: appointment.id } } );
        }
    } catch (error) {
        console.log(error)
    }
}

function normalizeDate(date) {
    date = new Date(date);

    let year = (date.getFullYear()).toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    month.length < 2 ? month = '0' + month : month;
    day.length < 2 ? day = '0' + day : day;

    return `${year}-${month}-${day}`;
}