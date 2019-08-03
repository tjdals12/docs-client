import React from 'react';
import Page from 'components/Page';
import DocumentSearchFormContainer from 'containers/Form/DocumentSearchFormContainer';
import DocumentTableContainer from 'containers/Table/DocumentTableContainer';
import PaginationContainer from 'containers/PaginationContainer';
import DocumentAddModalContainier from 'containers/Modal/DocumentAddModalContainer';
import DocumentDetailModalContainer from 'containers/Modal/DocumentDetailModalContainer';
import DocumentEditModalContainer from 'containers/Modal/DocumentEditModalContainer';
import queryString from 'query-string';
class DocumentsPage extends React.Component {
	render() {
		let { page } = queryString.parse(this.props.location.search);

		return (
			<Page title="Documents" breadcrumbs={[ { name: 'Documents', active: true } ]}>
				<DocumentSearchFormContainer />
				<DocumentTableContainer />
				<PaginationContainer page={parseInt(page || 1, 10)} />
				<DocumentAddModalContainier />
				<DocumentDetailModalContainer />
				<DocumentEditModalContainer />
			</Page>
		);
	}
}

export default DocumentsPage;
