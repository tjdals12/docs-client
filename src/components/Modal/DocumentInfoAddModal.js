import React from 'react';
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input,
	Table,
	Col,
	Button,
	ButtonGroup
} from 'reactstrap';
import { MdClose } from 'react-icons/md';
import { TiPlus, TiMinus } from 'react-icons/ti';

const DocumentInfoAddModal = ({
	vendorList,
	infos,
	isOpen,
	onClose,
	onTarget,
	onChange,
	onExcelUpload,
	onAddInfoForm,
	onDeleteInfoForm,
	onAddInfo,
	className,
	...rest
}) => {
	return (
		<Modal
			isOpen={isOpen}
			toggle={onClose}
			className={className}
			contentClassName="border-light rounded"
			{...rest}
			size="xl"
		>
			<ModalHeader toggle={onClose} className="bg-light">
				Document Index > Document 추가
			</ModalHeader>
			<ModalBody>
				<Form onSubmit={(e) => e.preventDefault()}>
					<FormGroup row>
						<Col md={12}>
							<Label for="vendor">업체</Label>
							<Input type="select" id="vendor" name="vendor" onChange={onTarget}>
								<option>--- 업체를 선택해주세요. ---</option>
								{vendorList.map((vendor) => (
									<option key={vendor.get('_id')} value={vendor.get('_id')}>
										{vendor.getIn([ 'vendor', 'vendorName' ])} ({vendor.getIn([ 'vendor', 'part', 'cdSName' ])},{' '}
										{vendor.getIn([ 'vendor', 'partNumber' ])})
									</option>
								))}
							</Input>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="list" md={2}>
							문서목록
						</Label>
						<Col md={4}>
							<Button className="custom-file-uploader">
								<Input
									type="file"
									name="indexes"
									onChange={(e) => {
										onExcelUpload(e.target.files[0]);
									}}
								/>
								Select a file
							</Button>
						</Col>
					</FormGroup>
					<Table bordered striped>
						<colgroup>
							<col width="40%" />
							<col width="40%" />
							<col width="15%" />
							<col with="5%" />
						</colgroup>
						<thead>
							<tr style={{ background: '#e7f5ff' }}>
								<th>Number</th>
								<th>Title</th>
								<th>Plan</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{infos.map((info) => {
								const { index, documentNumber, documentTitle, plan } = info.toJS();

								return (
									<tr key={index + 1}>
										<td className="text-right">
											<Input
												type="text"
												name="documentNumber"
												value={documentNumber}
												onChange={onChange(index)}
											/>
										</td>
										<td>
											<Input
												type="text"
												name="documentTitle"
												value={documentTitle}
												onChange={onChange(index)}
											/>
										</td>
										<td>
											<Input type="date" name="plan" value={plan} onChange={onChange(index)} />
										</td>
										<td>
											<MdClose
												className="can-click text-danger"
												onClick={onDeleteInfoForm(index)}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
					<ButtonGroup className="d-block text-center">
						<Button color="primary" onClick={onAddInfoForm}>
							<TiPlus />
						</Button>
						<Button color="secondary" onClick={onDeleteInfoForm(-1)}>
							<TiMinus />
						</Button>
					</ButtonGroup>
				</Form>
			</ModalBody>
			<ModalFooter className="bg-light">
				<Button color="primary" onClick={onAddInfo}>
					ADD
				</Button>
				<Button color="secondary" onClick={onClose}>
					CANCEL
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default DocumentInfoAddModal;
