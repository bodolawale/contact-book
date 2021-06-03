import { resolveToken } from "../utils/utility";
import User from "../entities/user";

export default class Authentication {
	static async check(req, res, next) {
		try {
			if (!req.header("authorization")) {
				return res
					.status(400)
					.json({ message: "Authorization header not found" });
			}
			const authorization = req.header("authorization");
			const [signature, token] = authorization.split(" ");
			if (!signature || signature !== "Bearer") {
				return res.status(400).json({ message: "Invalid signature" });
			}

			const decoded = resolveToken(token);

			const user = await User.findOne({ _id: decoded._id });
			if (!user) return res.status(400).json({ message: "Invalid token" });

			req.user = user;

			return next();
		} catch (err) {
			return res
				.status(400)
				.json({ message: "Error authenticating user", debug: err.message });
		}
	}
}
