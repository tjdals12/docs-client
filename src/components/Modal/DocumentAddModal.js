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
	Button,
	Col
} from 'reactstrap';
import PropTypes from 'prop-types';

const DocumentAddModal = ({ vendors, parts, gbs, isOpen, onClose, onChange, onInsert, className, ...rest }) => {
	return (
		<Modal
			isOpen={isOpen}
			toggle={onClose}
			className={className}
			contentClassName="border-light rounded"
			{...rest}
			size="lg"
		>
			<ModalHeader toggle={onClose} className="bg-light">
				Document 추가
			</ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup row>
						<Col md={6}>
							<Label for="vendor">VENDOR</Label>
							<Input type="select" name="vendor" onChange={onChange}>
								<option value="">------ 업체를 선택해주세요. ------</option>
								<option value="5d33ef877cceb91244d16fdd">바로</option>
								<option value="5d33ef877cceb91244d16fdd">유니콘</option>
								<option value="5d33ef877cceb91244d16fdd">신화전기</option>
								<option value="5d33ef877cceb91244d16fdd">우아한형제</option>
							</Input>
						</Col>

						<Col md={6}>
							<Label for="part">PART</Label>
							<Input type="select" name="part" onChange={onChange}>
								<option value="">------ 공종을 선택해주세요. ------</option>
								{parts.get('cdMinors').map((part) => (
									<option key={part.get('cdMinor')} value={part.get('cdMinor')}>
										{part.get('cdSName')}
									</option>
								))}
							</Input>
						</Col>
					</FormGroup>

					<FormGroup>
						<Label for="title">TITLE</Label>
						<Input name="documentTitle" placeholder="Document Title.." onChange={onChange} />
					</FormGroup>
					<FormGroup>
						<Label for="number">NO.</Label>
						<Input name="documentNumber" placeholder="Document Number.." onChange={onChange} />
					</FormGroup>
					<FormGroup row>
						<Col md={6}>
							<Label for="rev">REVISION</Label>
							<InputGroup>
								<InputGroupAddon addonType="prepend">Rev.</InputGroupAddon>
								<Input name="documentRev" placeholder="A" onChange={onChange} />
							</InputGroup>
						</Col>

						<Col md={6}>
							<Label for="gb">구분</Label>
							<Input type="select" name="documentGb" onChange={onChange}>
								{gbs.get('cdMinors').map((gb) => (
									<option key={gb.get('cdMinor')} value={gb.get('cdMinor')}>
										{gb.get('cdSName')}
									</option>
								))}
							</Input>
						</Col>
					</FormGroup>
					<FormGroup>
						<Label for="transmittal">TRANSMITTAL NO.</Label>
						<Input name="officialNumber" placeholder="Transmittal Number.." onChange={onChange} />
					</FormGroup>
					<FormGroup>
						<Label for="memo">MEMO</Label>
						<Input type="textarea" bsSize="lg" name="memo" onChange={onChange} />
					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter className="bg-light">
				<Button color="primary" onClick={onInsert}>
					ADD
				</Button>
				<Button color="secondary" onClick={onClose}>
					CANCEL
				</Button>
			</ModalFooter>
		</Modal>
	);
};

DocumentAddModal.propTypes = {
	vendors: PropTypes.arrayOf(PropTypes.string),
	parts: PropTypes.object,
	gbs: PropTypes.object,
	isOpen: PropTypes.bool,
	toggle: PropTypes.func,
	className: PropTypes.string
};

DocumentAddModal.defaultProps = {
	vendors: [],
	parts: {},
	gbs: {},
	isOpen: false
};

export default DocumentAddModal;
