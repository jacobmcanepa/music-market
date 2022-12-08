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
		<section className="container my-2 px-6">
			<h2 className="is-size-4 text-white font-semibold drop-shadow-lg">
				Upload an audio file here:
			</h2>

			<div className="flex flex-wrap m-2 justify-center">
				<button
					className="px-5 py-2 bg-emerald-200 hover:bg-teal-300 rounded-md"
					onClick={() => widgetRef.current.open()}
				>
					Upload
				</button>
			</div>
		</section>
	);
};

export default UploadWidget;
