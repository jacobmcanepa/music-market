import React, { useState } from 'react';

function Upload() {
	const [fileInputState, setFileInputState] = useState('');
	const [previewSource, setPreviewSource] = useState('');
	const [selectedFile, setSelectedFile] = useState('');
	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		previewFile(file);
	};
	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
	};
	const handleSubmitFile = (e) => {
		console.log('submitting');
		e.preventDefault();
		if (!previewSource) return;
		uploadImage(previewSource);
	};

	const uploadImage = (base64EncodedImage) => {
		console.log(base64EncodedImage);
	};
	return (
		<div>
			<h1>Upload</h1>
			<form onSubmit={handleSubmitFile}>
				<input
					type="file"
					name="song"
					onChange={handleFileInputChange}
					value={fileInputState}
				/>
				<button
					type="submit"
					className="px-5 py-2 bg-emerald-200 hover:bg-teal-300 rounded-md"
				>
					Submit
				</button>
			</form>
			{previewSource && (
				<img src={previewSource} alt="chosen" style={{ hieght: '300px' }}></img>
			)}
		</div>
	);
}

export default Upload;
