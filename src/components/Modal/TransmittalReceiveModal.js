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
	Col,
	Input,
	InputGroup,
	InputGroupAddon,
	Table
} from 'reactstrap';
import { MdClose } from 'react-icons/md';

const TransmittalReceiveModal = ({
	vendorList,
	isOpen,
	data,
	onClose,
	onChange,
	onReadDirectory,
	onDeleteReceiveDocument,
	onReceive,
	className,
	...rest
}) => {
	return (
		<Modal
			isOpen={isOpen}
			toggle={onClose}
			className={className}
			contentClassName="border rounded"
			{...rest}
			size="lg"
		>
			<ModalHeader toggle={onClose} className="bg-light">
				Transmittal 접수
			</ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup row>
						<Col md={6}>
							<Label for="vendor">업체</Label>
							<Input type="select" id="vendor" name="vendor" onChange={onChange}>
								<option value="">-- 업체 --</option>
								{vendorList.map((vendor) => (
									<option key={vendor.get('_id')} value={vendor.get('_id')}>
										{vendor.get('vendorName')} ({vendor.getIn([ 'part', 'cdSName' ])},{' '}
										{vendor.get('partNumber')})
									</option>
								))}
							</Input>
						</Col>
						<Col md={6}>
							<Label for="officialNumber">접수번호</Label>
							<Input
								type="text"
								id="officialNumber"
								name="officialNumber"
								placeholder="ex) ABC-DEF-T-R-001-001"
								onChange={onChange}
							/>
						</Col>
					</FormGroup>

					<FormGroup row>
						<Col md={6}>
							<Label for="sender">발신</Label>
							<InputGroup id="sender">
								<InputGroupAddon addonType="prepend">
									<Input type="select" name="senderGb" onChange={onChange}>
										<option value="">-- 구분 --</option>
										<option value="01">CLIENT</option>
										<option value="02">CONTRACTOR</option>
										<option value="03">VENDOR</option>
									</Input>
								</InputGroupAddon>
								<Input
									type="text"
									name="sender"
									className="ml-1"
									placeholder="ex) 홍길동 대리"
									onChange={onChange}
								/>
							</InputGroup>
						</Col>
						<Col md={6}>
							<Label for="receiver">수신</Label>
							<InputGroup id="receiver">
								<InputGroupAddon addonType="append">
									<Input type="select" name="receiverGb" onChange={onChange}>
										<option value="">-- 구분 --</option>
										<option value="01">CLIENT</option>
										<option value="02">CONTRACTOR</option>
										<option value="03">VENDOR</option>
									</Input>
								</InputGroupAddon>
								<Input
									type="text"
									name="receiver"
									className="ml-1"
									placeholder="ex) 이성민 사원"
									onChange={onChange}
								/>
							</InputGroup>
						</Col>
					</FormGroup>

					<FormGroup row className="mt-4">
						<Label for="receiveDocuments" md={2}>
							접수목록
						</Label>
						<Col md={4}>
							<Button className="custom-file-uploader can-click">
								<Input
									type="file"
									name="receiveDocuments"
									webkitdirectory=""
									directory=""
									onChange={onReadDirectory}
									value=""
								/>
								Select
							</Button>
						</Col>
					</FormGroup>
					<Table bordered striped>
						<colgroup>
							<col width="5%" />
							<col width="35%" />
							<col width="50%" />
							<col width="5%" />
							<col width="5%" />
						</colgroup>
						<thead>
							<tr style={{ background: '#e7f5ff' }}>
								<th className="text-right">#</th>
								<th>No.</th>
								<th>Title</th>
								<th className="text-center">Rev.</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{data.get('receiveDocuments').size === 0 ? (
								<tr>
									<td colSpan="5" className="text-center text-muted font-italic">
										폴더를 선택해주세요. 선택한 폴더 내의 파일을 기준으로 접수목록을 작성합니다.
									</td>
								</tr>
							) : (
								data.get('receiveDocuments').map((document, index) => (
									<tr key={index}>
										<td className="text-right">{index + 1}</td>
										<td>{document.get('documentNumber')}</td>
										<td>{document.get('documentTitle')}</td>
										<td className="text-center">{document.get('documentRev')}</td>
										<td className="text-center">
											<MdClose
												className="can-click text-danger"
												onClick={onDeleteReceiveDocument(document.get('id'))}
											/>
										</td>
									</tr>
								))
							)}
						</tbody>
					</Table>

					<FormGroup row className="mt-5">
						<Col md={6}>
							<Label for="receiveDate">접수일</Label>
							<Input
								type="date"
								id="receiveDate"
								name="receiveDate"
								value={data.get('receiveDate')}
								onChange={onChange}
							/>
						</Col>
						<Col md={6}>
							<Label for="targetDate">회신요청일</Label>
							<Input
								type="date"
								id="targetDate"
								name="targetDate"
								value={data.get('targetDate')}
								onChange={onChange}
							/>
						</Col>
					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter className="bg-light">
				<Button color="primary" onClick={onReceive}>
					RECEIVE
				</Button>
				<Button color="secondary" onClick={onClose}>
					CANCEL
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default TransmittalReceiveModal;
