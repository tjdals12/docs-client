import React from 'react';
import { Route } from 'react-router-dom';

const LayoutRoute = ({ layout: Layout, component: Component, ...restProps }) => (
	<Route
		{...restProps}
		render={(props) => (
			<Layout>
				<Component {...props} />
			</Layout>
		)}
	/>
);

export default LayoutRoute;
