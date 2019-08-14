import React from 'react';
import IndexesSearchForm from 'components/Form/IndexesSearchForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cmcodeActions from 'store/modules/cmcode';
import * as indexesActions from 'store/modules/indexes';

class IndexesSearchFormContainer extends React.Component {
	getCmcodes = async (major) => {
		const { CmcodeActions } = this.props;

		await CmcodeActions.getCmcodeByMajor({ major: major });
	};

	handleChange = (e) => {
		const { IndexesActions } = this.props;
		const { name, value } = e.target;

		IndexesActions.onChangeSearch({ name, value });
	};

	componentDidMount() {
		this.getCmcodes('0001');
	}

	render() {
		const { parts, search } = this.props;

		if (!parts) return null;

		return <IndexesSearchForm parts={parts} search={search} onChange={this.handleChange} />;
	}
}

export default connect(
	(state) => ({
		parts: state.cmcode.get('0001'),
		search: state.indexes.get('search')
	}),
	(dispatch) => ({
		CmcodeActions: bindActionCreators(cmcodeActions, dispatch),
		IndexesActions: bindActionCreators(indexesActions, dispatch)
	})
)(IndexesSearchFormContainer);
