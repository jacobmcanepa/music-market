import { useEffect, useRef } from 'react';

const UploadWidget = () => {
	const cloudinaryRef = useRef();
	const widgetRef = useRef();
	useEffect(() => {
		cloudinaryRef.current = window.cloudinary;
		widgetRef.current = cloudinaryRef.current.createUploadWidget(
			{
				cloudName: 'dpi8jsakt',
				uploadPreset: 'songs_ps',
				sources: ['local', 'dropbox', 'google_drive'],
			},
			function (error, result) {
				console.log(result);
			}
		);
	}, []);
	return (
		<button
			className="px-5 py-2 bg-emerald-200 hover:bg-teal-300 rounded-md"
			onClick={() => widgetRef.current.open()}
		>
			Upload
		</button>
	);
};

export default UploadWidget;
