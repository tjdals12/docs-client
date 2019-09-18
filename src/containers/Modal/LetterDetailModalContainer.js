import React from 'react';
import LetterDetailModal from 'components/Modal/LetterDetailModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from 'store/modules/modal';

class LetterDetailModalContainer extends React.Component {
	handleClose = () => {
		const { ModalActions } = this.props;

		ModalActions.close('letterDetail');
	};

	render() {
		const { letter, isOpen, loading } = this.props;

		if (loading || loading === undefined) return null;

		return <LetterDetailModal data={letter} isOpen={isOpen} onClose={this.handleClose} />;
	}
}

export default connect(
	(state) => ({
		letter: state.letter.get('letter'),
		isOpen: state.modal.get('letterDetailModal'),
		loading: state.pender.pending['letter/GET_LETTER']
	}),
	(dispatch) => ({
		ModalActions: bindActionCreators(modalActions, dispatch)
	})
)(LetterDetailModalContainer);
