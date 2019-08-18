import React from 'react';
import DocumentIndexEditModal from 'components/Modal/DocumentIndexEditModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import * as modalActions from 'store/modules/modal';
import * as indexesActions from 'store/modules/indexes';
import * as vendorActions from 'store/modules/vendor';

class DocumentIndexEditModalContainer extends React.Component {
	getVendorList = () => {
		const { VendorActions } = this.props;

		VendorActions.getVendorsForSelect();
	};

	handleClose = () => {
		const { ModalActions } = this.props;

		ModalActions.close('documentIndexEdit');
	};

	handleChange = (e) => {
		const { IndexesActions } = this.props;
		const { name, value } = e.target;

		IndexesActions.onChange({ target: 'edit', name, value });
	};

	handleChangeInfo = (id) => (e) => {
		const { IndexesActions } = this.props;
		const { name, value } = e.target;

		IndexesActions.onChangeEditInfo({ id, name, value });
	};

	handleChangeList = (id, type) => () => {
		const { IndexesActions } = this.props;

		IndexesActions.onChangeEditList({ id, type });
	};

	handleEdit = async () => {
		const { IndexesActions, target, edit } = this.props;

		await IndexesActions.editIndex(target, edit.toJS());
		this.handleClose();
	};

	handleExcelUpload = async (file) => {
		const { IndexesActions } = this.props;

		let formData = new FormData();
		formData.append('indexes', file);

		await axios({
			method: 'POST',
			// url: 'http://192.168.7.9/api/documentindex/readexcel',
			url: '/api/documentindex/readexcel',
			data: formData,
			config: { headers: { 'Content-Type': 'multipart/form-data' } }
		}).then((response) => {
			IndexesActions.onChange({
				target: 'edit',
				name: 'list',
				value: response.data.data
			});
		});
	};

	componentDidUpdate(prevProps) {
		if (prevProps.isOpen === false && this.props.isOpen !== prevProps.isOpen) {
			this.getVendorList();
		}
	}

	render() {
		const { edit, vendorList, isOpen, loading } = this.props;

		if (!vendorList || loading) return null;

		return (
			<DocumentIndexEditModal
				data={edit}
				vendorList={vendorList}
				isOpen={isOpen}
				onChange={this.handleChange}
				onChangeInfo={this.handleChangeInfo}
				onChangeList={this.handleChangeList}
				onClose={this.handleClose}
				onExcelUpload={this.handleExcelUpload}
				onEdit={this.handleEdit}
			/>
		);
	}
}

export default connect(
	(state) => ({
		edit: state.indexes.get('edit'),
		vendorList: state.vendor.get('vendorList'),
		isOpen: state.modal.get('documentIndexEditModal'),
		target: state.indexes.get('target'),
		loading: state.pender.pending['indexes/GET_INDEX']
	}),
	(dispatch) => ({
		ModalActions: bindActionCreators(modalActions, dispatch),
		IndexesActions: bindActionCreators(indexesActions, dispatch),
		VendorActions: bindActionCreators(vendorActions, dispatch)
	})
)(DocumentIndexEditModalContainer);