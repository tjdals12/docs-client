import React from 'react';
import ScrollToTop from 'components/ScrollToTop';
import Page from 'components/Page';
import LetterSearchForm from 'components/Form/LetterSearchForm';
import LetterTableContainer from 'containers/Table/LetterTableContainer';
import queryString from 'query-string';

const InternalTransmittalPage = (props) => {
	const { page } = queryString.parse(props.location.search);

	return (
		<ScrollToTop>
			<Page
				title="Internal Letters"
				breadcrumbs={[ { name: 'Letters', active: false }, { name: 'Internal', active: true } ]}
			>
				<LetterSearchForm />
				<LetterTableContainer page={parseInt(page || 1, 10)} />
			</Page>
		</ScrollToTop>
	);
};

export default InternalTransmittalPage;
