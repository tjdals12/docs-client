import React from 'react';
import DocumentTable from 'components/Table/DocumentTable';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from 'store/modules/document';
import * as modalActions from 'store/modules/modal';

class DocumentTableContainer extends React.Component {
	getDocuments = async () => {
		const { DocumentActions, history } = this.props;

		await DocumentActions.getDocuments({ page: 1 });
		history.push('/documents?page=1');
	};

	getDocument = (id) => {
		const { DocumentActions } = this.props;

		DocumentActions.getDocument({ id });
	};

	componentDidMount() {
		this.getDocuments();
	}

	handleOpenAdd = () => {
		const { ModalActions } = this.props;

		ModalActions.open('documentAdd');
	};

	handleDelete = () => {
		const { DocumentActions, checkedList, page } = this.props;

		DocumentActions.deleteDocuments(checkedList.toJS(), page);
	};

	handleOpenDetail = ({ id }) => async () => {
		const { ModalActions } = this.props;

		await this.getDocument(id);

		ModalActions.open('documentDetail');
	};

	handleChecked = (e) => {
		const { DocumentActions } = this.props;
		const { checked, value } = e.target;

		DocumentActions.setCheckedList({ checked: checked, value: value });
	};

	handleCheckedAll = (e) => {
		const { DocumentActions, documents } = this.props;
		const { checked } = e.target;

		documents.map((document) => {
			DocumentActions.setCheckedList({ checked: checked, value: document.get('_id') });
		});
	};

	render() {
		const { documents, checkedList, loading } = this.props;

		if (loading) return null;

		return (
			<DocumentTable
				data={documents}
				checkedList={checkedList.toJS()}
				onOpenAdd={this.handleOpenAdd}
				onDelete={this.handleDelete}
				onOpenDetail={this.handleOpenDetail}
				onChecked={this.handleChecked}
				onCheckedAll={this.handleCheckedAll}
				bordered
				striped
				hover
			/>
		);
	}
}

export default connect(
	(state) => ({
		documents: state.document.get('documents'),
		checkedList: state.document.get('checkedList'),
		loading: state.pender.pending['document/GET_DOCUMENTS']
	}),
	(dispatch) => ({
		DocumentActions: bindActionCreators(documentActions, dispatch),
		ModalActions: bindActionCreators(modalActions, dispatch)
	})
)(withRouter(DocumentTableContainer));
