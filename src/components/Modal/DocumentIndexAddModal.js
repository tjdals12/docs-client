import React from 'react';
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Form,
	FormGroup,
	Col,
	Label,
	Input,
	Table
} from 'reactstrap';

const DocumentIndexAddModal = ({
	data,
	vendorList,
	isOpen,
	onClose,
	onChange,
	onExcelUpload,
	onInsert,
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
				Document Index 추가
			</ModalHeader>
			<ModalBody>
				<Form onSubmit={(e) => e.preventDefault()}>
					<FormGroup row>
						<Col md={12}>
							<Label for="vendor">업체</Label>
							<Input type="select" name="vendor" onChange={onChange}>
								<option>--- 업체를 선택해주세요. ---</option>
								{vendorList.map((vendor) => (
									<option key={vendor.get('_id')} value={vendor.get('_id')}>
										{vendor.get('vendorName')} ({vendor.getIn([ 'part', 'cdSName' ])},{' '}
										{vendor.get('partNumber')})
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
							<Button className="custom-file-uploader can-click">
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
							<col with="5%" />
							<col width="40%" />
							<col width="40%" />
							<col width="15%" />
						</colgroup>
						<thead>
							<tr style={{ background: '#e7f5ff' }}>
								<th>#</th>
								<th>Number</th>
								<th>Title</th>
								<th>Plan</th>
							</tr>
						</thead>
						<tbody>
							{data.get('list').length === 0 ? (
								<tr>
									<td colSpan={4} className="text-center text-muted font-italic">
										양식에 맞게 작성된 엑셀 파일을 선택해주세요.
									</td>
								</tr>
							) : (
								data.get('list').map((document, index) => (
									<tr key={index}>
										<td className="text-right">{index + 1}</td>
										<td>{document.documentNumber}</td>
										<td>{document.documentTitle}</td>
										<td className="text-center">{document.plan.substr(0, 10)}</td>
									</tr>
								))
							)}
						</tbody>
					</Table>
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

export default DocumentIndexAddModal;
