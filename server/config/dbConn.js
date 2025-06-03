// const mongoose = require("mongoose");

// const connectDB = async () => {
// 	try {
// 		await mongoose.connect(process.env.DATABASE_URI);
// 	} catch (err) {
// 		console.error(err);
// 	}
// };

// module.exports = connectDB;
const mongoose = require("mongoose"); // ✅ Add this line

const localURI = process.env.DATABASE_URI_LOCAL;
const atlasURI = process.env.DATABASE_URI_ATLAS;

const connectDB = async () => {
	try {
		console.log("Attempting to connect to local MongoDB...");
		await mongoose.connect(localURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("✅ Connected to local MongoDB");
	} catch (localErr) {
		console.warn("⚠️ Failed to connect to local MongoDB.");
		console.warn(localErr.message);

		try {
			console.log("Attempting to connect to MongoDB Atlas...");
			await mongoose.connect(atlasURI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			console.log("✅ Connected to MongoDB Atlas");
		} catch (atlasErr) {
			console.error("❌ Failed to connect to both local and MongoDB Atlas.");
			console.error(atlasErr.message);
			process.exit(1);
		}
	}
};

module.exports = connectDB;
