import mongoose from "mongoose";
import logger from "./logger";

mongoose.Promise = global.Promise;

const uri = process.env.MONGO_URI;
const env = process.env.NODE_ENV;
const connection = mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

connection
	.then((db) => {
		logger.info(`Database connected successfully in ${env} mode.`);
		return db;
	})
	.catch((err) => {
		if (err.message.code === "ETIMEDOUT") {
			logger.info("Attempting to re-establish database connection.");
			mongoose.connect(uri);
		} else {
			logger.error("Error while attempting to connect to database:");
			logger.error(err);
		}
	});

export default connection;
