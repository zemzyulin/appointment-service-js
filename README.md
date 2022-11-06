## Doctor Appointment Service with notifications

### Short description
__Project Title:__ Doctor Appointment Service with notifications  
__Description:__ Node/Express REST API to manage a Doctor Appointment Service. Complete set of CRUD endpoints for Users, Doctors and Appointments. Users get notified 24 hours and 2 hours before visit. Notifications are logged into .log file. Doctors cannot conduct more than 3 appointments per day. All data is stored in MongoDB via Mongoose.

### Features
1. Complete system of routes to handle all requests from front-end.
2. Data is stored/retrieved from MogoDB database via Mongoose ODM.
3. Input validation and sanitization for all requests.
4. Server checks appointment timestamps and logs notifications into .log file.
5. Server changes status of appointments that have passed.

__Technology: JavaScript, Node.js, Express, MongoDB, Mongoose, REST__

<br>
<br>

### How to run locally
1. Install project dependencies using `npm install`
2. Create MongoDB database and name it 'appointments'
3. Run `npm start` or `npm dev`

<br>
<br>

Best regards,  
Yehor Zemzyulin