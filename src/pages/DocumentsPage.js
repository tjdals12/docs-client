import React from 'react';
import Page from 'components/Page';
import DocumentTableContainer from 'containers/Table/DocumentTableContainer';
import DocumentAddModalContainier from 'containers/Modal/DocumentAddModalContainer';
import DocumentDetailModalContainer from 'containers/Modal/DocumentDetailModalContainer';
import DocumentEditModalContainer from 'containers/Modal/DocumentEditModalContainer';
import queryString from 'query-string';
class DocumentsPage extends React.Component {
	render() {
		const { page } = queryString.parse(this.props.location.search);

		return (
			<Page title="Documents" breadcrumbs={[ { name: 'Documents', active: true } ]}>
				<DocumentTableContainer page={page} />
				<DocumentAddModalContainier />
				<DocumentDetailModalContainer />
				<DocumentEditModalContainer />
			</Page>
		);
	}
}

export default DocumentsPage;
