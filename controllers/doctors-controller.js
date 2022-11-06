import Doctor from "../models/doctors-model.js";
import { removeToken } from "../middleware/utils.js";

// list all doctors
export async function getAll(req, res) {
    try {
        let result = await Doctor.find({}, { reg_token: 0 });
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
}

// add doctor
export async function addOne(req, res) {
    try {
        let result = await Doctor.create(req.body);
        res.status(200).send(removeToken(result));
    } catch (error) {
        res.status(400).send(error);
    }
}

// list one doctor
export async function getOne(req, res) {
    try {
        res.status(200).send(res.locals.doctor);
    } catch (error) {
        res.status(400).send(error);
    }
}

// modify one doctor
export async function updateOne(req, res) {
    try {
        let result = await Doctor.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', select: { reg_token: 0 } });
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
}

// delete one doctor
export async function deleteOne(req, res) {
    try {
        await Doctor.findByIdAndRemove(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).send(error);
    }
}
