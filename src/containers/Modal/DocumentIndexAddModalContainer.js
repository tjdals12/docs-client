import React from 'react';
import DocumentIndexAddModal from 'components/Modal/DocumentIndexAddModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import * as modalActions from 'store/modules/modal';
import * as indexesActions from 'store/modules/indexes';
import * as vendorActions from 'store/modules/vendor';

class DocumentIndexAddModalContainer extends React.Component {
	getVendorList = () => {
		const { VendorActions } = this.props;

		VendorActions.getVendorsForSelect();
	};

	handleClose = () => {
		const { ModalActions } = this.props;

		ModalActions.close('documentIndexAdd');
	};

	handleChange = (e) => {
		const { IndexesActions } = this.props;
		const { name, value } = e.target;

		IndexesActions.onChange({ target: 'add', name, value });
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
				target: 'add',
				name: 'list',
				value: response.data.data
			});
		});
	};

	handleInsert = async () => {
		const { IndexesActions, documentIndex } = this.props;

		await IndexesActions.addIndex(documentIndex.toJS());
		this.handleClose();
	};

	componentDidUpdate(prevProps) {
		if (prevProps.isOpen === false && this.props.isOpen !== prevProps.isOpen) {
			this.getVendorList();
		}
	}

	render() {
		const { vendorList, documentIndex, isOpen } = this.props;

		if (!vendorList) return null;

		return (
			<DocumentIndexAddModal
				data={documentIndex}
				vendorList={vendorList}
				isOpen={isOpen}
				onClose={this.handleClose}
				onChange={this.handleChange}
				onExcelUpload={this.handleExcelUpload}
				onInsert={this.handleInsert}
			/>
		);
	}
}

export default connect(
	(state) => ({
		documentIndex: state.indexes.get('add'),
		vendorList: state.vendor.get('vendorList'),
		isOpen: state.modal.get('documentIndexAddModal')
	}),
	(dispatch) => ({
		ModalActions: bindActionCreators(modalActions, dispatch),
		IndexesActions: bindActionCreators(indexesActions, dispatch),
		VendorActions: bindActionCreators(vendorActions, dispatch)
	})
)(DocumentIndexAddModalContainer);
