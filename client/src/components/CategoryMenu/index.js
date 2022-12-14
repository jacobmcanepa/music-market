import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
	UPDATE_CATEGORIES,
	UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
	const [state, dispatch] = useStoreContext();

	const { categories } = state;

	const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

	useEffect(() => {
		if (categoryData) {
			dispatch({
				type: UPDATE_CATEGORIES,
				categories: categoryData.categories,
			});
			categoryData.categories.forEach((category) => {
				idbPromise('categories', 'put', category);
			});
		} else if (!loading) {
			idbPromise('categories', 'get').then((categories) => {
				dispatch({
					type: UPDATE_CATEGORIES,
					categories: categories,
				});
			});
		}
	}, [categoryData, loading, dispatch]);

	const handleClick = (id) => {
		dispatch({
			type: UPDATE_CURRENT_CATEGORY,
			currentCategory: id,
		});
	};

	return (
		<section className="container my-2 px-6">
			<h2 className="is-size-4 text-white font-semibold drop-shadow-lg">
				Categories:
			</h2>

			<div className="flex flex-wrap m-2 justify-center">
				{categories.map((item) => (
					<button
						className="px-4 py-1 m-1 transition ease-in-out delay-150 bg-emerald-200 hover:-translate-y-1 hover:scale-110 hover:bg-teal-300 duration-300 rounded-md drop-shadow-xl"
						key={item._id}
						onClick={() => {
							handleClick(item._id);
						}}
					>
						{item.name}
					</button>
				))}
			</div>
		</section>
	);
}

export default CategoryMenu;
