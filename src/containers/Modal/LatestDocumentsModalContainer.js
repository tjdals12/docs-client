import React from 'react';
import LatestDocumentsModal from 'components/Modal/LatestDocumentsModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as infoActions from 'store/modules/info';
import * as modalActions from 'store/modules/modal';

class LatestDocumentsModalContainer extends React.Component {
	getLatestDocuments = () => {
		const { InfoActions, vendor } = this.props;

		InfoActions.getLatestDocuments({ vendor: vendor.get('_id') });
	};

	handleClose = () => {
		const { ModalActions } = this.props;

		ModalActions.close('latestDocuments');
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.isOpen === false && this.props.isOpen !== prevProps.isOpen) {
			this.getLatestDocuments();
		}
	}

	render() {
		const { latest, vendor, isOpen, loading } = this.props;

		if (loading || loading === undefined) return null;

		return <LatestDocumentsModal vendor={vendor} data={latest} isOpen={isOpen} onClose={this.handleClose} />;
	}
}

export default connect(
	(state) => ({
		latest: state.info.get('latest'),
		vendor: state.indexes.getIn([ 'index', 'vendor' ]),
		isOpen: state.modal.get('latestDocumentsModal'),
		loading: state.pender.pending['info/GET_LATEST_DOCUMENTS']
	}),
	(dispatch) => ({
		InfoActions: bindActionCreators(infoActions, dispatch),
		ModalActions: bindActionCreators(modalActions, dispatch)
	})
)(LatestDocumentsModalContainer);
