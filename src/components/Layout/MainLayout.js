import React from 'react';
import bn from 'utils/bemnames';
import Content from './Content';
import Header from './Header';

const bem = bn.create('app');

const MainLayout = ({ children }) => {
	return (
		<div className={bem.b('bg-light')}>
			<div>Sidebar</div>
			<Content fluid>
				<Header />
				{children}
				<div>Footer</div>
			</Content>
		</div>
	);
};

export default MainLayout;
