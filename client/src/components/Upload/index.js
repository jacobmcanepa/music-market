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
				Submit a song for review!:
			</h2>

			<div className="flex flex-wrap m-2 justify-center">
				<button
					className="px-4 py-1 m-1 transition ease-in-out delay-150 bg-emerald-200 hover:-translate-y-1 hover:scale-110 hover:bg-teal-300 duration-300 rounded-md drop-shadow-xl"
					onClick={() => widgetRef.current.open()}
				>
					Upload
				</button>
			</div>
		</section>
	);
};

export default UploadWidget;
