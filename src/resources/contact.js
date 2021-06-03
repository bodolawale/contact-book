import Contact from "../controllers/contact";
import Authentication from "../middleware/authentication";
/**
 *
 *
 */
module.exports = (app) => {
	app.route("/contacts").post(Authentication.check, Contact.create);

	app.route("/contacts").get(Authentication.check, Contact.all);
	app.route("/contacts/:id").get(Authentication.check, Contact.get);

	app.route("/contacts/:id").patch(Authentication.check, Contact.update);

	app.route("/contacts/:id").delete(Authentication.check, Contact.remove);
	/**
	 * Create the remaining routes
	 * get,
	 * create,
	 * delete,
	 * update,
	 * remove
	 */
};
