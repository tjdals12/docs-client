import React from 'react';
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ButtonGroup,
	Button,
	Input,
	InputGroup,
	InputGroupAddon,
	Table,
	Progress,
	Col
} from 'reactstrap';

const DocumentDetailModal = ({
	codes,
	isOpen,
	data,
	reason,
	onClose,
	onHold,
	onDelete,
	onEdit,
	onChange,
	onStatus,
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
				Document 상세{' '}
				<span className="text-primary">
					({data.get('documentNumber')}_{data.get('documentTitle')}_{data.get('documentRev')})
				</span>
			</ModalHeader>
			<ModalBody className="p-0">
				<Table borderless className="rounded m-0">
					<colgroup>
						<col width="20%" />
						<col width="30%" />
						<col width="20%" />
						<col width="30%" />
					</colgroup>
					<tbody>
						<tr className="border-bottom">
							<th scope="row" className="text-right bg-light">
								업체 (공종)
							</th>
							<td>
								{data.get('vendor')} ({data.getIn([ 'part', 'cdSName' ])})
							</td>
							<th scope="row" className="text-right bg-light">
								구분
							</th>
							<td>{data.getIn([ 'documentGb', 'cdSName' ])}</td>
						</tr>
						<tr className="border-bottom">
							<th scope="row" className="text-right bg-light">
								문서번호
							</th>
							<td>{data.get('documentNumber')}</td>
							<th scope="row" className="text-right bg-light">
								문서명
							</th>
							<td>{data.get('documentTitle')}</td>
						</tr>
						<tr className="border-bottom">
							<th scope="row" className="text-right bg-light">
								Revision
							</th>
							<td>{data.get('documentRev')}</td>
							<th scope="row" className="text-right bg-light">
								중요도
							</th>
							<td>
								<div className="pb-1">{data.get('level')} (Max: 5)</div>
								<Progress max={5} value={data.get('level')} />
							</td>
						</tr>
						<tr className="border-bottom">
							<th rowSpan="2" scope="row" className="text-right align-middle bg-light">
								지연여부
							</th>
							<td rowSpan="2">{data.get('delayGb')}</td>
							<th scope="row" className="text-right bg-light">
								삭제여부
							</th>
							<td className="">
								{data.getIn([ 'deleteYn', 'yn' ])}{' '}
								{data.getIn([ 'deleteYn', 'yn' ]) === 'YES' && (
									<span className="text-danger">({data.getIn([ 'deleteYn', 'deleteDt' ])})</span>
								)}
							</td>
						</tr>
						<tr className="border-bottom">
							<th scope="row" className="text-right bg-light">
								보류여부
							</th>
							<td>
								{data.getIn([ 'holdYn', -1, 'yn' ])}{' '}
								{data.getIn([ 'holdYn', -1, 'yn' ]) === 'YES' && (
									<span className="text-danger">
										({data.getIn([ 'holdYn', -1, 'effStaDt' ]).substr(0, 10)} ~{' '}
										{data.getIn([ 'holdYn', -1, 'effEndDt' ]).substr(0, 10) === '9999-12-31' ? (
											'진행중'
										) : (
											data.getIn([ 'holdYn', -1, 'effEndDt' ]).substr(0, 10)
										)})
									</span>
								)}
							</td>
						</tr>
						<tr className="border-bottom">
							<th scope="row" className="text-right bg-light">
								In / Out 기록
							</th>
							<td>
								{data.get('documentInOut').map((item, index) => {
									return (
										<div key={index} className="mb-2">
											<span key={index}>{item.get('inOutGb')}</span>
											<br />

											<span className="text-danger">
												({item.getIn([ 'timestamp', 'regDt' ]).substr(0, 10)})
											</span>
										</div>
									);
								})}
							</td>
							<th scope="row" className="text-right bg-light">
								Status
							</th>
							<td>
								{data.get('documentStatus').map((item, index) => {
									return (
										<div key={index} className="mb-2">
											<span key={index}>
												{item.get('status')}
												{!!item.get('resultCode') && ` (${item.get('resultCode')})`}
												{!!item.get('replyCode') && ` - ${item.get('replyCode')}`}
											</span>
											<br />

											<span className="text-danger">
												({item.getIn([ 'timestamp', 'regDt' ]).substr(0, 10)})
											</span>
										</div>
									);
								})}
							</td>
						</tr>
						<tr className="border-bottom">
							<th scope="row" className="text-right bg-light">
								메모
							</th>
							<td colSpan="3">{data.get('memo')}</td>
						</tr>
						<tr>
							<th scope="row" className="text-right bg-light">
								등록정보
							</th>
							<td colSpan="3">
								<span className="text-secondary">
									등록: {data.getIn([ 'timestamp', 'regId' ])} ({data.getIn([ 'timestamp', 'regDt' ])})
								</span>
								<br />
								<span className="text-secondary">
									수정: {data.getIn([ 'timestamp', 'updId' ])} ({data.getIn([ 'timestamp', 'updDt' ])})
								</span>
							</td>
						</tr>
					</tbody>
				</Table>
			</ModalBody>
			<ModalFooter className="bg-light">
				<Col className="pr-5">
					<InputGroup>
						<Input type="select" name="status" onChange={onChange}>
							<option value="">--- 변경할 상태를 선택해주세요. ---</option>
							{codes.get('cdMinors').map((code) => (
								<option key={code.get('_id')} value={JSON.stringify(code.get('cdRef1'))}>
									{code.get('cdSName')}
								</option>
							))}
						</Input>
						<InputGroupAddon addonType="append">
							<Button onClick={onStatus({ id: data.get('id') })}>변경</Button>
						</InputGroupAddon>
					</InputGroup>
				</Col>
				<Input
					type="text"
					name="reason"
					placeholder="Hold 또는 Delete 사유 (필수)"
					className="w-25"
					onChange={onChange}
					value={reason}
				/>
				<ButtonGroup>
					{data.getIn([ 'deleteYn', 'yn' ]) === 'NO' ? (
						<Button color="danger" onClick={onDelete({ id: data.get('id'), yn: 'YES' })}>
							DELETE
						</Button>
					) : (
						<Button color="danger" onClick={onDelete({ id: data.get('id'), yn: 'NO' })}>
							DELETE 취소
						</Button>
					)}
					{data.getIn([ 'holdYn', -1, 'yn' ]) === 'NO' ? (
						<Button color="info" onClick={onHold({ id: data.get('id'), yn: 'YES' })}>
							HOLD
						</Button>
					) : (
						<Button color="info" onClick={onHold({ id: data.get('id'), yn: 'NO' })}>
							HOLD 취소
						</Button>
					)}
				</ButtonGroup>
				<Button color="primary" onClick={onEdit}>
					EDIT
				</Button>
				<Button color="secondary" onClick={onClose}>
					CANCEL
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default DocumentDetailModal;
