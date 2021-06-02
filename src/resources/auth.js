import Auth from "../controllers/auth";
import Authentication from "../middleware/authentication";

module.exports = (app) => {
	app.route("/auth/login").post(Auth.login);
	app.route("/auth/signup").post(Auth.signup);

	/*** BONUS POINTS ***/
	app
		.route("/auth/forgotPassword")
		.post(Authentication.check, Auth.forgotPassword);
};
