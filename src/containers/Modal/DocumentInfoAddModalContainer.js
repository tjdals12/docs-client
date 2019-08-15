import React from 'react';
import DocumentInfoAddModal from 'components/Modal/DocumentInfoAddModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import * as modalActions from 'store/modules/modal';
import * as indexesActions from 'store/modules/indexes';

class DocumentInfoAddModalContainer extends React.Component {
	getVendorList = () => {
		const { IndexesActions } = this.props;

		IndexesActions.getIndexesForSelect();
	};

	handleClose = () => {
		const { ModalActions } = this.props;

		ModalActions.close('documentInfoAdd');
	};

	handleTarget = (e) => {
		const { value } = e.target;
		const { IndexesActions } = this.props;

		IndexesActions.setTarget(value);
	};

	handleChange = (index) => (e) => {
		const { IndexesActions } = this.props;
		const { name, value } = e.target;

		IndexesActions.onChangeInfo({ index, name, value });
	};

	handleExcelUpload = (file) => {
		const { IndexesActions } = this.props;

		let formData = new FormData();
		formData.append('indexes', file);

		axios({
			method: 'POST',
			url: '/api/documentindex/readexcel',
			data: formData
		}).then((response) => {
			IndexesActions.addInfoByExcel(response.data.data);
		});
	};

	handleAddInfoForm = () => {
		const { IndexesActions } = this.props;

		IndexesActions.addInfoForm();
	};

	handleDeleteInfoForm = (index) => () => {
		const { IndexesActions } = this.props;

		IndexesActions.deleteInfoForm(index);
	};

	handleAddInfo = async () => {
		const { IndexesActions, target, infos } = this.props;

		await IndexesActions.addPartial({ id: target, list: infos });
		this.handleClose();
	};

	componentDidUpdate(prevProps) {
		if (prevProps.isOpen === false && this.props.isOpen !== prevProps.isOpen) {
			this.getVendorList();
		}
	}

	render() {
		const { vendorList, infos, isOpen } = this.props;

		if (!vendorList) return null;

		return (
			<DocumentInfoAddModal
				vendorList={vendorList}
				infos={infos}
				isOpen={isOpen}
				onClose={this.handleClose}
				onTarget={this.handleTarget}
				onChange={this.handleChange}
				onExcelUpload={this.handleExcelUpload}
				onAddInfoForm={this.handleAddInfoForm}
				onDeleteInfoForm={this.handleDeleteInfoForm}
				onAddInfo={this.handleAddInfo}
			/>
		);
	}
}

export default connect(
	(state) => ({
		vendorList: state.indexes.get('vendorList'),
		target: state.indexes.get('target'),
		infos: state.indexes.get('infos'),
		isOpen: state.modal.get('documentInfoAddModal')
	}),
	(dispatch) => ({
		ModalActions: bindActionCreators(modalActions, dispatch),
		IndexesActions: bindActionCreators(indexesActions, dispatch)
	})
)(DocumentInfoAddModalContainer);
