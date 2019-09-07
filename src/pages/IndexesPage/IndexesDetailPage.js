import React from 'react';
import ScrollToTop from 'components/ScrollToTop';
import Page from 'components/Page';

import IndexCardContainer from 'containers/Card/IndexCardContainer';
import IndexesDetailTemplateContainer from 'containers/Template/IndexesDetailTemplateContainer';

import DocumentDetailModalContainer from 'containers/Modal/DocumentDetailModalContainer';
import VendorDetailModalContainer from 'containers/Modal/VendorDetailModalContainer';

import queryString from 'query-string';

class IndexesDetailPage extends React.Component {
	render() {
		const { id, page } = queryString.parse(this.props.location.search);

		return (
			<ScrollToTop>
				<Page
					title="Index Detail"
					breadcrumbs={[ { name: 'Indexes', active: false }, { name: 'Detail', active: true } ]}
				>
					<IndexCardContainer id={id} />
					<IndexesDetailTemplateContainer id={id} page={parseInt(page || 1, 10)} />
					<DocumentDetailModalContainer />
					<VendorDetailModalContainer />
				</Page>
			</ScrollToTop>
		);
	}
}

export default IndexesDetailPage;
