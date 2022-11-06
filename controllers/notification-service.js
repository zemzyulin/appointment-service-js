import * as fs from 'node:fs/promises';
import * as cron from 'node-cron';
import Appointment from "../models/appointments-model.js";
import User from "../models/users-model.js";
import Doctor from "../models/doctors-model.js";

// send cron task to main app
export function task1() {
    cron.schedule('* * * * *', () => {
        notifyUsers();
    })
}

// main notification function
async function notifyUsers() {
    let benchmarkDay = 86400000;
    let benchmarkTwoHours = 7200000;
    
    // 1. Filter active apps within next 24 hours
    let allActiveApps = await Appointment.find({ active: true });
    let activeApps = allActiveApps.filter(el => Date.parse(el.date) - Date.now() < (benchmarkDay + 5000));

    // 2. Assign notifications
    activeApps.forEach(async (el) => {
        let pDate = Date.parse(el.date);
        let nDate = Date.now();
        
        // a. Notify 24 hours prior to app start
        if (pDate - nDate > (benchmarkDay - 5000) && pDate - nDate < (benchmarkDay + 5000)) {
            logger(el, '24');
        }
        // b. Notify 2 hours prior to app start
        if (pDate - nDate > (benchmarkTwoHours - 5000) && pDate - nDate < (benchmarkTwoHours + 5000)) {
            logger(el, '2');
        }
        // c. Remove apps that have already started
        if (pDate - nDate < 0) {
            console.log(el.id);
            await Appointment.findByIdAndUpdate(el.id, { active: false });
        }
    })
}

// compose message and log it
async function logger(appointment, type) {
    try {
        let { date, user, doctor } = appointment;
        let { name } = await User.findOne({ _id: user }, { reg_token: 0 });
        let { spec } = await Doctor.findOne({ _id: doctor }, { reg_token: 0 });
        let dateNow = normalizeDateTime(Date.now());
        let dateApp = normalizeDateTime(date);       

        const option24 = `${dateNow} | Hello, ${name}! You have an appointment with ${spec} tomorrow at ${dateApp}`;
        const option2 = `${dateNow} | Hello, ${name}! Your appointment is in 2 hours with ${spec} at ${dateApp}`;
        let content;

        type === "24" ? content = "\n" + option24 : content = "\n" + option2;
        await fs.writeFile('./logs/notifications.log', content, { flag: 'a+' })
    } catch (error) {
        console.log(error);
    }
}

// helper function to format date and time
function normalizeDateTime(date) {
    date = new Date(date);

    let year = (date.getFullYear()).toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let hour = (date.getHours()).toString();
    let minute = (date.getMinutes()).toString();

    month.length < 2 ? month = '0' + month : month;
    day.length < 2 ? day = '0' + day : day;
    hour.length < 2 ? hour = '0' + hour : hour;
    minute.length < 2 ? minute = '0' + minute : minute;

    return `${year}-${month}-${day} ${hour}:${minute}`;
}