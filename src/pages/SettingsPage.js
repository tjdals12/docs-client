import React from 'react';
import ScrollToTop from 'components/ScrollToTop';
import Page from 'components/Page';
import ProjectCollapseCardContainer from 'containers/Card/ProjectCollapseCardContainer';
import TemplateCollapseCardContainer from 'containers/Card/TemplateCollapseCardContainer';

const SettingsPage = () => {
	return (
		<Page title="Settings" breadcrumbs={[ { name: 'Settings', active: true } ]}>
			<ScrollToTop>
				<ProjectCollapseCardContainer />
				<TemplateCollapseCardContainer />
			</ScrollToTop>
		</Page>
	);
};

export default SettingsPage;
