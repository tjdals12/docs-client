import React from 'react';
import Pagination from 'components/Pagination';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from 'store/modules/document';

class PaginationContainer extends React.Component {
	getDocuments = async (page) => {
		const { DocumentActions, isSearch, search, history } = this.props;

		if (isSearch) {
			await DocumentActions.searchDocuments(page, search.toJS());
			history.push(`/documents?page=${page}`);
		} else {
			await DocumentActions.getDocuments({ page });
			history.push(`/documents?page=${page}`);
		}
	};

	render() {
		const { lastPage, page } = this.props;

		return (
			<Pagination
				currentPage={page}
				lastPage={lastPage}
				onPage={this.getDocuments}
				size="md"
				aria-label="Page navigation"
				listClassName="flex-row justify-content-end ml-auto"
			/>
		);
	}
}

export default connect(
	(state) => ({
		isSearch: state.document.getIn([ 'search', 'isSearch' ]),
		search: state.document.get('search'),
		lastPage: state.document.get('lastPage')
	}),
	(dispatch) => ({
		DocumentActions: bindActionCreators(documentActions, dispatch)
	})
)(withRouter(PaginationContainer));
