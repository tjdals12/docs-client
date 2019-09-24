import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table } from 'reactstrap';
import PropTypes from 'prop-types';

const LatestDocumentsModal = ({ data, vendor, isOpen, onClose, className, ...rest }) => {
	return (
		<Modal isOpen={isOpen} toggle={onClose} className={className} contentClassName="rounded" {...rest} size="xl">
			<ModalHeader toggle={onClose} className="bg-light">
				Latest Document 목록{' '}
				<span className="have-link">
					({`${vendor.get('partNumber')} / ${vendor.get('itemName')} / ${vendor.get('vendorName')}`})
				</span>
			</ModalHeader>
			<ModalBody className="p-0">
				<Table dark bordered hover striped className="m-0 p-0">
					<colgroup>
						<col width="3%" />
						<col width="25%" />
						<col width="35%" />
						<col width="7%" />
						<col width="10%" />
						<col width="20%" />
					</colgroup>
					<thead>
						<tr>
							<th className="text-right">#</th>
							<th>No.</th>
							<th>Title</th>
							<th className="text-center">Rev.</th>
							<th>접수</th>
							<th>현재 상태</th>
						</tr>
					</thead>
					<tbody>
						{data.map((data, index) => {
							const { _id, documentNumber, documentTitle, latestDocument } = data.toJS();
							const { documentRev, documentInOut, documentStatus } = latestDocument;

							return (
								<tr key={_id}>
									<td className="text-right">{index + 1}</td>
									<td>{documentNumber}</td>
									<td className="have-link">{documentTitle}</td>
									<td className="text-center">{documentRev ? `Rev.${documentRev}` : '-'}</td>
									<td>
										{documentInOut ? (
											documentInOut.timestamp.regDt.substr(0, 10)
										) : (
											<span className="text-danger">접수되지 않음</span>
										)}
									</td>
									<td>
										{documentStatus ? (
											`${documentStatus.statusName} (${documentStatus.timestamp.regDt.substr(
												0,
												10
											)})`
										) : (
											'-'
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</ModalBody>
			<ModalFooter>
				<Button onClick={onClose}>CANCEL</Button>
			</ModalFooter>
		</Modal>
	);
};

LatestDocumentsModal.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	className: PropTypes.string
};

LatestDocumentsModal.defaultProps = {
	isOpen: false,
	onClose: () => console.warn('Warning: onClose is not defined')
};

export default LatestDocumentsModal;
