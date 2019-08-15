import React from 'react';
import IndexList from 'components/List/IndexList';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from 'store/modules/modal';
import * as indexesActions from 'store/modules/indexes';

class IndexListContainer extends React.Component {
	getIndexes = async (page) => {
		const { IndexesActions } = this.props;

		await IndexesActions.getIndexes({ page });
	};

	handleOpenAdd = () => {
		const { ModalActions } = this.props;

		ModalActions.open('documentIndexAdd');
	};

	handleOpenQuestion = () => {
		const { ModalActions } = this.props;

		ModalActions.open('question');
	};

	handleOpenEdit = (id) => async () => {
		const { ModalActions, IndexesActions } = this.props;

		await IndexesActions.getIndex({ id });
		ModalActions.open('documentIndexEdit');
	};

	handleOpenInfoAdd = () => {
		const { ModalActions } = this.props;

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

	handleDetailPage = () => {
		const { history } = this.props;
		history.push('/documents?page=1');
	};

	handleDeleteIndex = async () => {
		const { ModalActions, IndexesActions, target } = this.props;

		await IndexesActions.deleteIndex({ id: target });
		ModalActions.close('question');
	};

	componentDidMount() {
		this.getIndexes(1);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.indexes.toJS() !== this.props.indexes.toJS()) {
			return true;
		}

		return false;
	}

	render() {
		const { isOpenQuestion, indexes, loading } = this.props;

		if (loading) return null;

		return (
			<IndexList
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
			/>
		);
	}
}

export default connect(
	(state) => ({
		isOpenQuestion: state.modal.get('questionModal'),
		indexes: state.indexes.get('indexes'),
		target: state.indexes.get('target'),
		loading: state.pender.pending['indexes/GET_INDEXES']
	}),
	(dispatch) => ({
		ModalActions: bindActionCreators(modalActions, dispatch),
		IndexesActions: bindActionCreators(indexesActions, dispatch)
	})
)(withRouter(IndexListContainer));
