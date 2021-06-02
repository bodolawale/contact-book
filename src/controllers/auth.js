import User from "../entities/user";
import { generateToken } from "../utils/utility";
import logger from "../utils/logger";
import { response } from "express";

/**
 * Given a json request
 * {"username": "<...>", "password": "<...>"}
 * Verify the user is valid and return some authentication token
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
export const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!username) return res.status(422).json({ err: "username required" });
		if (!password) return res.status(422).json({ err: "password required" });

		const user = await User.findOne({ username });
		if (!user) return res.status(400).json({ err: "invalid credentials" });

		const result = await user.verifyPassword(password);
		if (!result) return res.status(400).json({ err: "invalid credentials" });

		const token = generateToken(user._id);

		res.status(200).json({ message: "login successful", user, token });
	} catch (error) {
		res.status(500).json({ err: error.message });
	}
};
/**
 * Given a json request
 * {"username": "<...>", "password": "<...>"}
 * Create a new user and return some authentication token
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
export const signup = async (req, res) => {
	try {
		const { username, password, name } = req.body;
		if (!username) return res.status(422).json({ err: "username is required" });
		if (!password) return res.status(422).json({ err: "password is required" });
		if (!name) return res.status(422).json({ err: "name is required" });

		const exist = await User.findOne({ username });
		if (exist) return res.status(400).json({ err: "username already taken" });

		const user = await User.create({ username, password, name });

		const token = generateToken(user._id);

		res.status(200).json({ message: "user created successfully", user, token });
	} catch (error) {
		res.status(500).json({ err: error.message });
	}
};
/**
 * Implement a way to recover user accounts
 */
export const forgotPassword = (req, res) => {
	res.status(404).json({ err: "not implemented" });
};

export default {
	login,
	signup,
	forgotPassword,
};
