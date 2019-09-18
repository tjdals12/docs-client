import React from 'react';
import LetterAddModal from 'components/Modal/LetterAddModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from 'store/modules/modal';
import * as letterActions from 'store/modules/letter';

class LetterAddModalContainer extends React.Component {
	handleClose = (name) => () => {
		const { ModalActions } = this.props;

		ModalActions.close(name);
	};

	handleChange = (e) => {
		const { LetterActions } = this.props;
		const { name, value } = e.target;

		LetterActions.onChange({ target: 'add', name, value });
	};

	handleAdd = () => {
		const { LetterActions, add } = this.props;

		LetterActions.addLetter(add.toJS());
	};

	render() {
		const { add, errors, isOpen } = this.props;

		return (
			<LetterAddModal
				data={add}
				errors={errors}
				isOpen={isOpen}
				onClose={this.handleClose}
				onChange={this.handleChange}
				onAdd={this.handleAdd}
			/>
		);
	}
}

export default connect(
	(state) => ({
		add: state.letter.get('add'),
		errors: state.letter.get('errors'),
		isOpen: state.modal.get('letterAddModal')
	}),
	(dispatch) => ({
		ModalActions: bindActionCreators(modalActions, dispatch),
		LetterActions: bindActionCreators(letterActions, dispatch)
	})
)(LetterAddModalContainer);