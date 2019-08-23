import React from 'react';
import ScrollToTop from 'components/ScrollToTop';
import Page from 'components/Page';
import IndexCardContainer from 'containers/Card/IndexCardContainer';
import queryString from 'query-string';
import IndexesDetailTemplateContainer from 'containers/Template/IndexesDetailTemplateContainer';
import DocumentDetailModalContainer from 'containers/Modal/DocumentDetailModalContainer';
import VendorDetailModalContainer from 'containers/Modal/VendorDetailModalContainer';

class IndexesDetailPage extends React.Component {
	render() {
		const { id } = queryString.parse(this.props.location.search);

		return (
			<ScrollToTop>
				<Page
					title="Index Detail"
					breadcrumbs={[ { name: 'Indexes', active: false }, { name: 'Detail', active: true } ]}
				>
					<IndexCardContainer id={id} />
					<IndexesDetailTemplateContainer id={id} />
					<DocumentDetailModalContainer />
					<VendorDetailModalContainer />
				</Page>
			</ScrollToTop>
		);
	}
}

export default IndexesDetailPage;
