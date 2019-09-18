import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table } from 'reactstrap';
import PropTypes from 'prop-types';

const LetterDetailModal = ({ data, isOpen, onClose, onOpen, className, ...rest }) => {
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
				Letter 상세 <span className="text-primary">({data.get('officialNumber')})</span>
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
								구분
							</th>
							<td className={data.get('letterGb') === 'E-mail' ? 'text-info' : 'text-danger'}>
								{data.get('letterGb')}
							</td>
							<th scope="row" className="text-right bg-light">
								공식번호
							</th>
							<td>{data.get('officialNumber')}</td>
						</tr>
						<tr className="border-bottom">
							<th scope="row" className="text-right bg-light">
								제목
							</th>
							<td colSpan="3">{data.get('letterTitle')}</td>
						</tr>
						<tr className="border-bottom">
							<th scope="row" className="text-right bg-light">
								발신
							</th>
							<td>
								{data.get('senderGb')}: {data.get('sender')}
							</td>
							<th scope="row" className="text-right bg-light">
								수신
							</th>
							<td>
								{data.get('receiverGb')}: {data.get('receiver')}
							</td>
						</tr>
						<tr className="border-bottom">
							<th rowSpan="2" scope="row" className="text-right align-middle bg-light">
								발신일
							</th>
							<td rowSpan="2" className="text-success font-weight-bold">
								{data.get('sendDate').substr(0, 10)}
							</td>
							<th scope="row" className="text-right bg-light">
								회신요청일
							</th>
							<td>
								{data.get('replyRequired') === 'NO' ? (
									<span className="text-danger">회신 필요없음</span>
								) : (
									<span className="text-success">{data.get('targetDate').substr(0, 10)}</span>
								)}
							</td>
						</tr>
						<tr className="border-bottom">
							<th scope="row" className="text-right bg-light">
								회신여부
							</th>
							<td>
								{data.get('replyRequired') === 'YES' ? (
									<span className="text-danger">
										{data.get('replyYn')}{' '}
										{data.get('replyYn') === 'YES' && `(${data.get('replyDate')})`}
									</span>
								) : (
									'-'
								)}
							</td>
						</tr>
						<tr className="border-bottom">
							<th scope="row" className="text-right bg-light">
								메모
							</th>
							<td colSpan={3}>{data.get('memo') || '-'}</td>
						</tr>
						<tr>
							<th scope="row" className="text-right bg-light">
								등록정보
							</th>
							<td colSpan={3}>
								<span className="text-danger">
									등록: {data.getIn([ 'timestamp', 'regId' ])} ({data.getIn([ 'timestamp', 'regDt' ])})
								</span>
								<br />
								<span className="text-danger">
									수정: {data.getIn([ 'timestamp', 'updId' ])} ({data.getIn([ 'timestamp', 'updDt' ])})
								</span>
							</td>
						</tr>
					</tbody>
				</Table>
			</ModalBody>
			<ModalFooter className="bg-light">
				<Button color="primary" onClick={onOpen('letterEdit')}>
					EDIT
				</Button>
				<Button color="secondary" onClick={onClose}>
					CANCEL
				</Button>
			</ModalFooter>
		</Modal>
	);
};

LetterDetailModal.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	onOpen: PropTypes.func,
	className: PropTypes.string
};

LetterDetailModal.defaultProps = {
	isOpen: false,
	onClose: () => console.warn('Warning: onClose is not defined'),
	onOpen: () => console.warn('Warning: onOpen is not defined')
};

export default LetterDetailModal;
