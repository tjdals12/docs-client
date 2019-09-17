import React from 'react';
import { withRouter } from 'react-router-dom';
import LetterTable from 'components/Table/LetterTable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as letterActions from 'store/modules/letter';

class LetterTableContainer extends React.Component {
	getTransmittals = async (page) => {
		const { LetterActions, history } = this.props;

		await LetterActions.getLetters(page);
		history.push(`/letters/internal?page=${page}`);
	};

	componentDidMount() {
		this.getTransmittals(1);
	}

	render() {
		const { transmittals, page, lastPage, loading } = this.props;

		if (loading || loading === 'undefined') return null;

		return <LetterTable page={page} lastPage={lastPage} data={transmittals} onPage={this.getTransmittals} />;
	}
}

export default connect(
	(state) => ({
		transmittals: state.letter.get('letters'),
		lastPage: state.letter.get('lastPage'),
		loading: state.pender.pending['letter/GET_LETTERS']
	}),
	(dispatch) => ({
		LetterActions: bindActionCreators(letterActions, dispatch)
	})
)(withRouter(LetterTableContainer));
