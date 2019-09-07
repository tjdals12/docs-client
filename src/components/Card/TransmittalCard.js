import React from 'react';
import classNames from 'classnames';
import { Card, CardHeader, CardBody, Table } from 'reactstrap';
import PropTypes from 'prop-types';

const tableStyle = {
	display: 'block',
	height: '100%',
	overflow: 'scroll'
};

const heightMap = {
	sm: {
		height: '200px'
	},
	md: {
		height: '400px'
	},
	lg: {
		height: '600px'
	}
};

const TransmittalCard = ({ data, onOpenDetail, height, className, ...rest }) => {
	const classes = classNames('w-100 h-100', className);

	return (
		<Card className={classes} {...rest}>
			<CardHeader className="title-font">Transmittal</CardHeader>
			<CardBody className="p-2" style={{ ...heightMap[height] }}>
				<Table striped style={{ ...tableStyle }}>
					<colgroup>
						<col width="30%" />
						<col width="5%" />
						<col width="15%" />
						<col width="15%" />
						<col width="35%" />
					</colgroup>
					<thead>
						<tr>
							<th>No.</th>
							<th className="text-center">건</th>
							<th className="text-center">접수일</th>
							<th className="text-center">목표일</th>
							<th className="text-center">상태</th>
						</tr>
					</thead>
					<tbody>
						{data.size > 0 ? (
							data.map((transmittal) => {
								const {
									_id,
									officialNumber,
									documents,
									receiveDate,
									targetDate,
									letterStatus
								} = transmittal.toJS();

								return (
									<tr key={_id}>
										<td className="have-link" onClick={() => onOpenDetail(_id)}>
											{officialNumber}
										</td>
										<td className="text-center">{documents.length}</td>
										<td className="text-center">{receiveDate.substr(0, 10)}</td>
										<td className="text-center">{targetDate.substr(0, 10)}</td>
										<td className="text-right">
											{letterStatus.statusName}{' '}
											<span className="text-danger">
												({letterStatus.timestamp.regDt.substr(0, 10)})
											</span>
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td colSpan="6" className="text-center text-muted font-italic">
									접수된 이력이 없습니다.
								</td>
							</tr>
						)}
					</tbody>
				</Table>
			</CardBody>
		</Card>
	);
};

TransmittalCard.propTypes = {
	data: PropTypes.object,
	height: PropTypes.string,
	className: PropTypes.string
};

TransmittalCard.defaultProps = {
	height: 'md'
};

export default TransmittalCard;
