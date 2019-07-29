import React from 'react';
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Form,
	FormGroup,
	Label,
	InputGroup,
	InputGroupAddon,
	Input,
	Col
} from 'reactstrap';

const DocumentEditModal = ({ data, parts, gbs, isOpen, onClose, onChange, onEdit, className, ...rest }) => {
	const {
		id,
		vendor,
		part,
		documentGb,
		documentTitle,
		documentNumber,
		documentRev,
		officialNumber,
		memo
	} = data.toJS();

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
				Document 수정
			</ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup row>
						<Col md={6}>
							<Label for="vendor">VENDOR</Label>
							<Input type="select" name="vendor" value={vendor} onChange={onChange}>
								<option value="">------ 업체를 선택해주세요. ------</option>
								{parts.get('cdMinors').map((part) => (
									<option key={part.get('cdMinor')} value={part.get('cdMinor')}>
										{part.get('cdSName')}
									</option>
								))}
							</Input>
						</Col>

						<Col md={6}>
							<Label for="part">PART</Label>
							<Input type="select" name="part" value={part} onChange={onChange}>
								<option value="">------ 공종을 선택해주세요. ------</option>
								<option value="01">기계</option>
								<option value="02">장치</option>
								<option value="03">전기</option>
								<option value="04">계장</option>
								<option value="05">건축</option>
								<option value="06">토목</option>
								<option value="07">소방</option>
							</Input>
						</Col>
					</FormGroup>

					<FormGroup>
						<Label for="title">TITLE</Label>
						<Input
							name="documentTitle"
							placeholder="Document Title.."
							className="text-danger"
							onChange={onChange}
							defaultValue={documentTitle}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="number">NO.</Label>
						<Input
							name="documentNumber"
							placeholder="Document Number.."
							className="text-danger"
							onChange={onChange}
							defaultValue={documentNumber}
						/>
					</FormGroup>
					<FormGroup row>
						<Col md={6}>
							<Label for="rev">REVISION</Label>
							<InputGroup>
								<InputGroupAddon addonType="prepend">Rev.</InputGroupAddon>
								<Input
									name="documentRev"
									placeholder="A"
									className="text-danger"
									onChange={onChange}
									defaultValue={documentRev}
								/>
							</InputGroup>
						</Col>

						<Col md={6}>
							<Label for="gb">구분</Label>
							<Input type="select" name="documentGb" value={documentGb} onChange={onChange}>
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
						<Input
							name="officialNumber"
							placeholder="Transmittal Number.."
							className="text-danger"
							onChange={onChange}
							defaultValue={officialNumber}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="memo">MEMO</Label>
						<Input
							type="textarea"
							bsSize="lg"
							name="memo"
							className="text-danger"
							style={{ fontSize: '.9rem' }}
							onChange={onChange}
							defaultValue={memo}
						/>
					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter className="bg-light">
				<Button color="primary" onClick={onEdit({ id })}>
					EDIT
				</Button>
				<Button onClick={onClose}>CANCEL</Button>
			</ModalFooter>
		</Modal>
	);
};

export default DocumentEditModal;
