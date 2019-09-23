import React from 'react';
import ScrollToTop from 'components/ScrollToTop';
import Page from 'components/Page';
import CollapseCardContainer from 'containers/Card/CollapseCardContainer';

const SettingsPage = () => {
	return (
		<Page title="Settings" breadcrumbs={[ { name: 'Settings', active: true } ]}>
			<ScrollToTop>
				<CollapseCardContainer />
			</ScrollToTop>
		</Page>
	);
};

export default SettingsPage;
