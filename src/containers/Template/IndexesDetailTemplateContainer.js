import React from 'react';
import IndexesDetailTemplate from 'templates/IndexesDetailTemplate';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as indexesActions from 'store/modules/indexes';
import * as documentActions from 'store/modules/document';
import * as modalActions from 'store/modules/modal';

class IndexesDetailTemplateContainer extends React.Component {
	getIndexDetail = async () => {
		const { IndexesActions, id } = this.props;

		await IndexesActions.getIndexDetail({ id });
	};

	componentDidMount() {
		this.getIndexDetail();
	}

	render() {
		const { indexDetail, loading } = this.props;

		if (loading || loading === undefined) return null;

		return <IndexesDetailTemplate data={indexDetail} />;
	}
}

export default connect(
	(state) => ({
		indexDetail: state.indexes.get('indexDetail'),
		loading: state.pender.pending['indexes/GET_INDEX_DETAIL']
	}),
	(dispatch) => ({
		IndexesActions: bindActionCreators(indexesActions, dispatch),
		DocumentActions: bindActionCreators(documentActions, dispatch),
		ModalActions: bindActionCreators(modalActions, dispatch)
	})
)(IndexesDetailTemplateContainer);
