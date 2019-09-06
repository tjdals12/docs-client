import React from 'react';
import IndexesDetailTemplate from 'templates/IndexesDetailTemplate';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as transmittalActions from 'store/modules/transmittal';
import * as indexesActions from 'store/modules/indexes';
import * as documentActions from 'store/modules/document';
import * as modalActions from 'store/modules/modal';

class IndexesDetailTemplateContainer extends React.Component {
	getIndexDetail = async () => {
		const { IndexesActions, id } = this.props;

		await IndexesActions.getIndexDetail({ id });
	};

	getTransmittal = (id) => {
		const { TransmittalActions } = this.props;

		TransmittalActions.getTransmittal({ id });
	};

	handleOpenTransmittalDetail = async (id) => {
		const { ModalActions } = this.props;

		await this.getTransmittal(id);
		ModalActions.open('transmittalDetail');
	};

	componentDidMount() {
		this.getIndexDetail();
	}

	render() {
		const { indexDetail, loading } = this.props;

		if (loading || loading === undefined) return null;

		return <IndexesDetailTemplate data={indexDetail} onOpenTransmittalDetail={this.handleOpenTransmittalDetail} />;
	}
}

export default connect(
	(state) => ({
		indexDetail: state.indexes.get('indexDetail'),
		loading: state.pender.pending['indexes/GET_INDEX_DETAIL']
	}),
	(dispatch) => ({
		TransmittalActions: bindActionCreators(transmittalActions, dispatch),
		IndexesActions: bindActionCreators(indexesActions, dispatch),
		DocumentActions: bindActionCreators(documentActions, dispatch),
		ModalActions: bindActionCreators(modalActions, dispatch)
	})
)(IndexesDetailTemplateContainer);
