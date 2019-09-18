import React from 'react';
import LetterDetailModal from 'components/Modal/LetterDetailModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from 'store/modules/modal';
import * as letterActions from 'store/modules/letter';

class LetterDetailModalContainer extends React.Component {
	handleClose = () => {
		const { ModalActions } = this.props;

		ModalActions.close('letterDetail');
	};

	handleOpen = (name) => () => {
		const { ModalActions, LetterActions } = this.props;

		if (name === 'letterEdit') {
			this.handleClose();
			LetterActions.initialize('errors');
		}

		ModalActions.open(name);
	};

	handleChange = (e) => {
		const { LetterActions } = this.props;
		const { name, value } = e.target;

		LetterActions.onChange({ name, value });
	};

	handleCancel = (yn) => () => {
		const { LetterActions, id, reason } = this.props;

		LetterActions.cancelLetter({ id, yn, reason });
	};

	render() {
		const { letter, reasonError, isOpen, loading } = this.props;

		if (loading || loading === undefined) return null;

		return (
			<LetterDetailModal
				data={letter}
				reasonError={reasonError}
				isOpen={isOpen}
				onClose={this.handleClose}
				onOpen={this.handleOpen}
				onChange={this.handleChange}
				onCancel={this.handleCancel}
			/>
		);
	}
}

export default connect(
	(state) => ({
		id: state.letter.getIn([ 'letter', '_id' ]),
		letter: state.letter.get('letter'),
		reason: state.letter.get('reason'),
		reasonError: state.letter.get('reasonError'),
		isOpen: state.modal.get('letterDetailModal'),
		loading: state.pender.pending['letter/GET_LETTER']
	}),
	(dispatch) => ({
		ModalActions: bindActionCreators(modalActions, dispatch),
		LetterActions: bindActionCreators(letterActions, dispatch)
	})
)(LetterDetailModalContainer);
