import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
	return jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRY,
	});
};

export const resolveToken = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET);
};
