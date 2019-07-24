import React from 'react';
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	InputGroup,
	InputGroupAddon,
	Label,
	Input,
	Button
} from 'reactstrap';
import PropTypes from 'prop-types';

const DocumentAddModal = ({ vendors, parts, gbs, isOpen, toggle, className, ...rest }) => {
	return (
		<Modal isOpen={isOpen} toggle={toggle} contentClassName="border-light rounded" {...rest}>
			<ModalHeader toggle={toggle} className="bg-light">
				Document 추가
			</ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup>
						<Label for="vendor">Vendor :</Label>
						<Input type="select" name="vendor">
							<option value="0">바로</option>
							<option value="1">유니콘</option>
							<option value="2">신화전기</option>
							<option value="3">우아한형제</option>
						</Input>
					</FormGroup>
					<FormGroup>
						<Label for="part">Part :</Label>
						<Input type="select" name="part" multiple>
							<option value="0">기계</option>
							<option value="1">장치</option>
							<option value="2">전기</option>
							<option value="3">계장</option>
							<option value="4">건축</option>
							<option value="5">토목</option>
							<option value="6">소방</option>
						</Input>
					</FormGroup>
					<FormGroup>
						<Label for="title">Title :</Label>
						<Input name="documentTitle" placeholder="Document Title.." />
					</FormGroup>
					<FormGroup>
						<Label for="number">No. :</Label>
						<Input name="documentNumber" placeholder="Document Number.." />
					</FormGroup>
					<FormGroup>
						<Label for="gb">구분 :</Label>
						<Input type="select" name="documentGb">
							<option value="00">공통</option>
							<option value="01">절차서</option>
							<option value="02">도면</option>
							<option value="03">보고서</option>
						</Input>
					</FormGroup>
					<FormGroup>
						<Label for="rev">Revision :</Label>
						<InputGroup>
							<InputGroupAddon addonType="prepend">Rev.</InputGroupAddon>
							<Input name="documentRev" placeholder="A" />
						</InputGroup>
					</FormGroup>
					<FormGroup>
						<Label for="transmittal">Transmittal No. :</Label>
						<Input name="officialNumber" placeholder="Transmittal Number.." />
					</FormGroup>
					<FormGroup>
						<Label for="memo">Memo :</Label>
						<Input type="textarea" bsSize="lg" name="memo" />
					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter className="bg-light">
				<Button color="primary">ADD</Button>
				<Button color="secondary" onClick={toggle}>
					DELETE
				</Button>
			</ModalFooter>
		</Modal>
	);
};

DocumentAddModal.propTypes = {
	vendors: PropTypes.arrayOf(PropTypes.string),
	parts: PropTypes.arrayOf(PropTypes.string),
	isOpen: PropTypes.bool,
	toggle: PropTypes.func,
	className: PropTypes.string
};

DocumentAddModal.defaultProps = {
	vendors: [],
	parts: [],
	gbs: [],
	isOpen: false
};

export default DocumentAddModal;
