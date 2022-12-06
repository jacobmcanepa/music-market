const cloudinary = require('cloudinary').v2;

//import cloudinary from 'cloudinary';

// A simple function to upload to Cloudinary
const uploadFile = async (file) => {
	// The Upload scalar return a a promise
	const { createReadStream } = await file;
	const fileStream = createReadStream();

	// Initiate Cloudinary with your credentials
	cloudinary.config({
		cloud_name: process.env.CLOUD_NAME,
		api_key: process.env.CLOUD_KEY,
		api_secret: process.env.CLOUD_KEY_SECRET,
	});

	// Return the Cloudinary object when it's all good
	return new Promise((resolve, reject) => {
		const cloudStream = cloudinary.v2.uploader.upload_stream(function (
			err,
			fileUploaded
		) {
			// In case something hit the fan
			if (err) {
				reject(err);
			}

			// All good :smile:
			resolve(fileUploaded);
		});

		fileStream.pipe(cloudStream);
	});
};

exports.cloudinary = cloudinary;
exports.uploadFile = uploadFile;
