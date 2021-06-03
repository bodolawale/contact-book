import _ from "lodash";
import Contact from "../entities/contact";
/**
 * A simple CRUD controller for contacts
 * Create the necessary controller methods
 */

const all = async (req, res) => {
	try {
		const contacts = await Contact.find({ createdBy: req.user._id });
		return res
			.status(200)
			.json({ message: "contacts fetched successfully", contacts });
	} catch (error) {
		res.status(400).json({ err: error.message });
	}
};

const get = async (req, res) => {
	try {
		const contact = await Contact.findOne({ _id: req.params.id }).populate(
			"createdBy",
			["_id", "username", "name"]
		);
		if (!contact) {
			return res.status(404).json({ message: "contact not found!" });
		}
		return res
			.status(200)
			.json({ message: "contact fetched successfully", contact });
	} catch (error) {
		res.status(400).json({ err: error.message });
	}
};

const create = async (req, res) => {
	try {
		const contactDTO = _.pick(req.body, [
			"firstName",
			"lastName",
			"email",
			"phone",
			"address",
		]);
		contactDTO.createdBy = req.user._id;

		const contact = await Contact.create(contactDTO);

		return res
			.status(200)
			.json({ message: "contact created successfully", contact });
	} catch (error) {
		res.status(400).json({ err: error.message });
	}
};

const update = async (req, res) => {
	try {
		const contactDTO = _.pick(req.body, [
			"firstName",
			"lastName",
			"email",
			"phone",
			"address",
		]);

		const contact = await Contact.findOneAndUpdate(
			{ _id: req.params.id },
			contactDTO,
			{ new: true }
		);

		return res
			.status(200)
			.json({ message: "contact updated successfully", contact });
	} catch (error) {
		res.status(400).json({ err: error.message });
	}
};

const remove = async (req, res) => {
	try {
		const contact = await Contact.deleteOne({ _id: req.params.id });

		return res
			.status(200)
			.json({ message: "contact deleted successfully", contact });
	} catch (error) {
		res.status(400).json({ err: error.message });
	}
};

export default {
	// get all contacts for a user
	all,
	// get a single contact
	get,
	// create a single contact
	create,
	// update a single contact
	update,
	// remove a single contact
	remove,
};
