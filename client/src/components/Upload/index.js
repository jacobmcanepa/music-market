import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const UPLOAD_AVATAR = gql`
	mutation uploadAvatar($avatar: Upload!) {
		uploadAvatar(avatar: $avatar) {
			id
		}
	}
`;

const UploadAvatar = ({ url }) => {
	const [uploadAvatarMutation] = useMutation(UPLOAD_AVATAR);
	const [avatar, setAvatar] = useState(null);

	// Store in the state the file
	const handleChange = (e) => {
		setAvatar(e.target.files[0]);
	};

	// Trigger the mutation when we click the submit button
	const handleClick = () => {
		uploadAvatarMutation({
			variables: {
				avatar,
			},
		});
	};

	return (
		<div>
			<input id="logo" type="file" onChange={handleChange} />
			<button
				className="px-5 py-2 bg-emerald-200 hover:bg-teal-300 rounded-md"
				type="button"
				onClick={handleClick}
			>
				Submit
			</button>
		</div>
	);
};

export default UploadAvatar;
