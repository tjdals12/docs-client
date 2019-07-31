import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FaCheckCircle } from 'react-icons/fa';

const QuestionModal = ({ isOpen, size, header, body, footer, onClose, className }) => {
	return (
		<Modal
			isOpen={isOpen}
			toggle={onClose('question')}
			size={size}
			className={className}
			contentClassName="border-light rounded"
		>
			<ModalHeader toggle={onClose('question')}>
				<FaCheckCircle size={25} className="pb-1 pr-2 text-danger" />
				<span>{header}</span>
			</ModalHeader>
			<ModalBody>{body}</ModalBody>
			<ModalFooter>
				{footer}
				<Button color="secondary" onClick={onClose('question')}>
					CANCEL
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default QuestionModal;
