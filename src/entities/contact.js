import mongoose, { Schema } from "mongoose";
import _ from "lodash";

export const ContactSchema = new Schema(
	{
		//  define the necessary fields for your contact list
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
		},
		email: {
			type: String,
		},
		phone: {
			type: String,
		},
		address: {
			type: String,
		},
	},
	{ collection: "contacts" }
);

ContactSchema.methods = {
	toJSON() {
		const userObject = this.toObject();
		return _.pick(userObject, [
			"_id",
			"createdBy",
			"firstName",
			"lastName",
			"email",
			"phone",
			"address",
			"createdAt",
			"updatedAt",
		]);
	},
};

export default mongoose.model("Contact", ContactSchema);
