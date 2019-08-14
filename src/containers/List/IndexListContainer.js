import React from 'react';
import IndexList from 'components/List/IndexList';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as indexesActions from 'store/modules/indexes';

class IndexListContainer extends React.Component {
	getIndexes = async (page) => {
		const { IndexesActions } = this.props;

		await IndexesActions.getIndexes({ page });
	};

	handleDetail = () => {
		const { history } = this.props;
		history.push('/documents?page=1');
	};

	componentDidMount() {
		this.getIndexes(1);
	}

	render() {
		const { indexes, loading } = this.props;

		if (loading) return null;

		return <IndexList data={indexes} onDetail={this.handleDetail} />;
	}
}

export default connect(
	(state) => ({
		indexes: state.indexes.get('indexes'),
		loading: state.pender.pending['indexes/GET_INDEXES']
	}),
	(dispatch) => ({
		IndexesActions: bindActionCreators(indexesActions, dispatch)
	})
)(withRouter(IndexListContainer));
