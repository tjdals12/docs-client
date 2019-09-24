import React from 'react';
import ScrollToTop from 'components/ScrollToTop';
import Page from 'components/Page';
import ProjectCollapseCardContainer from 'containers/Card/ProjectCollapseCardContainer';

const SettingsPage = () => {
	return (
		<Page title="Settings" breadcrumbs={[ { name: 'Settings', active: true } ]}>
			<ScrollToTop>
				<ProjectCollapseCardContainer />
			</ScrollToTop>
		</Page>
	);
};

export default SettingsPage;
