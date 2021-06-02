import mongoose, { Schema } from "mongoose";
import _ from "lodash";
import bcrypt from "bcrypt";
import timestamps from "mongoose-timestamp";
import mongooseStringQuery from "mongoose-string-query";

// I am just using username and password, no email
export const UserSchema = new Schema(
	{
		username: {
			type: String,
			lowercase: true,
			trim: true,
			index: true,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
		},
	},
	{ collection: "users" }
);

UserSchema.plugin(timestamps);
UserSchema.plugin(mongooseStringQuery);

UserSchema.index({ email: 1, username: 1 });

UserSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	}
	next();
});

UserSchema.methods = {
	toJSON() {
		const userObject = this.toObject();
		return _.pick(userObject, [
			"_id",
			"username",
			"name",
			"createdAt",
			"updatedAt",
		]);
	},
};

UserSchema.methods.verifyPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
