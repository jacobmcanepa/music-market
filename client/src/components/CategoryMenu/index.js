import React, { useEffect } from 'react';

/* TODO: !!!! */
function CategoryMenu() {

  const handleClick = () => {
    console.log('handle click');
  };

	return (
		<section>
			<h2>Categories:</h2>

			<div>
				<button className="px-5 py-2 mx-2 bg-emerald-200 hover:bg-teal-300 rounded-md" onClick={() => {
            handleClick();
          }}>
					category name
				</button>
				<button className="px-5 py-2 mx-2 bg-emerald-200 hover:bg-teal-300 rounded-md" onClick={() => {
            handleClick();
          }}>
					category name
				</button>
				<button className="px-5 py-2 mx-2 bg-emerald-200 hover:bg-teal-300 rounded-md" onClick={() => {
            handleClick();
          }}>
					category name
				</button>
			</div>
		</section>
	);
}

export default CategoryMenu;
