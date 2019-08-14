import React from 'react';
import ScrollToTop from 'components/ScrollToTop';
import Page from 'components/Page';
import IndexesSearchFormContainer from 'containers/Form/IndexesSearchFormContainer';
import IndexListContainer from 'containers/List/IndexListContainer';
import queryString from 'query-string';

class IndexesOverallPage extends React.Component {
	render() {
		const { page } = queryString.parse(this.props.location.search);

		return (
			<ScrollToTop>
				<Page
					title="Indexes"
					breadcrumbs={[ { name: 'Indexes', active: false }, { name: 'Overall', active: true } ]}
				>
					<IndexesSearchFormContainer />
					<IndexListContainer page={parseInt(page || 1, 10)} />
				</Page>
			</ScrollToTop>
		);
	}
}

export default IndexesOverallPage;
