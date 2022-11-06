import User from "../models/users-model.js";
import { removeToken } from "../middleware/utils.js";

// list all users
export async function getAll(req, res) {
    try {
        let result = await User.find({}, { reg_token: 0 });
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
}

// add user
export async function addOne(req, res) {
    try {
        let result = await User.create(req.body);
        res.status(200).send(removeToken(result));
    } catch (error) {
        res.status(400).send(error);
    }
}

// list one user
export async function getOne(req, res) {
    try {
        res.status(200).send(res.locals.user);
    } catch (error) {
        res.status(400).send(error);
    }
}

// modify one user
export async function updateOne(req, res) {
    try {
        let result = await User.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', select: { reg_token: 0 } });
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
}

// delete one user
export async function deleteOne(req, res) {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).send(error);
    }
}