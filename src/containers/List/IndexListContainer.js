import React from 'react';
import IndexList from 'components/List/IndexList';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from 'store/modules/modal';
import * as indexesActions from 'store/modules/indexes';

class IndexListContainer extends React.Component {
	getIndexes = async (page) => {
		const { IndexesActions, search, history, isSearch } = this.props;

		if (isSearch) {
			await IndexesActions.searchIndexes(page, search.toJS());
		} else {
			await IndexesActions.getIndexes({ page });
		}

		history.push(`/indexes/overall?page=${page}`);
	};

	handleOpenAdd = () => {
		const { ModalActions, IndexesActions } = this.props;

		IndexesActions.initialize('error');
		ModalActions.open('documentIndexAdd');
	};

	handleOpenQuestion = () => {
		const { ModalActions } = this.props;

		ModalActions.open('question');
	};

	handleOpenEdit = (id) => async () => {
		const { ModalActions, IndexesActions } = this.props;

		IndexesActions.initialize('infosError');
		await IndexesActions.getIndex({ id });
		ModalActions.open('documentIndexEdit');
	};

	handleOpenInfoAdd = () => {
		const { ModalActions, IndexesActions } = this.props;

		IndexesActions.setTarget('');
		IndexesActions.initialize('error');
		ModalActions.open('documentInfoAdd');
	};

	handleClose = (name) => () => {
		const { ModalActions } = this.props;

		ModalActions.close(name);
	};

	handleTarget = (id) => {
		const { IndexesActions } = this.props;

		IndexesActions.setTarget(id);
	};

	handleDetailPage = (id) => () => {
		const { history } = this.props;
		history.push(`/indexes/detail?id=${id}`);
	};

	handleDeleteIndex = async () => {
		const { ModalActions, IndexesActions, target } = this.props;

		await IndexesActions.deleteIndex({ id: target });
		ModalActions.close('question');
	};

	componentDidMount() {
		this.getIndexes(1);
	}

	render() {
		const { isOpenQuestion, page, lastPage, indexes, loading } = this.props;

		if (loading) return null;

		return (
			<IndexList
				page={page}
				lastPage={lastPage}
				data={indexes}
				isOpenQuestion={isOpenQuestion}
				onOpenQuestion={this.handleOpenQuestion}
				onClose={this.handleClose}
				onOpenAdd={this.handleOpenAdd}
				onTarget={this.handleTarget}
				onDetailPage={this.handleDetailPage}
				onDeleteIndex={this.handleDeleteIndex}
				onOpenEdit={this.handleOpenEdit}
				onOpenInfoAdd={this.handleOpenInfoAdd}
				onPage={this.getIndexes}
			/>
		);
	}
}

export default connect(
	(state) => ({
		lastPage: state.indexes.get('lastPage'),
		isOpenQuestion: state.modal.get('questionModal'),
		indexes: state.indexes.get('indexes'),
		target: state.indexes.get('target'),
		isSearch: state.indexes.getIn([ 'search', 'isSearch' ]),
		search: state.indexes.get('search'),
		loading: state.pender.pending['indexes/GET_INDEXES']
	}),
	(dispatch) => ({
		ModalActions: bindActionCreators(modalActions, dispatch),
		IndexesActions: bindActionCreators(indexesActions, dispatch)
	})
)(withRouter(IndexListContainer));
