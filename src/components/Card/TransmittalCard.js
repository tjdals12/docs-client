import React from 'react';
import classNames from 'classnames';
import { Card, CardHeader, CardBody, Table } from 'reactstrap';

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

const TransmittalCard = ({ height, className, ...rest }) => {
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
						<tr>
							<td>ABC-DEF-T-R-001-001</td>
							<td className="text-center">242</td>
							<td className="text-center">2019-09-23</td>
							<td className="text-center">2019-10-06</td>
							<td className="text-right">
								사업주 재검토중 <span className="text-danger">(2019-09-27)</span>
							</td>
						</tr>

						<tr>
							<td>ABC-DEF-T-R-001-001</td>
							<td className="text-center">242</td>
							<td className="text-center">2019-09-23</td>
							<td className="text-center">2019-10-06</td>
							<td className="text-right">
								사업주 재검토중 <span className="text-danger">(2019-09-27)</span>
							</td>
						</tr>
						<tr>
							<td>ABC-DEF-T-R-001-001</td>
							<td className="text-center">242</td>
							<td className="text-center">2019-09-23</td>
							<td className="text-center">2019-10-06</td>
							<td className="text-right">
								사업주 재검토중 <span className="text-danger">(2019-09-27)</span>
							</td>
						</tr>
						<tr>
							<td>ABC-DEF-T-R-001-001</td>
							<td className="text-center">242</td>
							<td className="text-center">2019-09-23</td>
							<td className="text-center">2019-10-06</td>
							<td className="text-right">
								사업주 재검토중 <span className="text-danger">(2019-09-27)</span>
							</td>
						</tr>
						<tr>
							<td>ABC-DEF-T-R-001-001</td>
							<td className="text-center">242</td>
							<td className="text-center">2019-09-23</td>
							<td className="text-center">2019-10-06</td>
							<td className="text-right">
								사업주 재검토중 <span className="text-danger">(2019-09-27)</span>
							</td>
						</tr>
						<tr>
							<td>ABC-DEF-T-R-001-001</td>
							<td className="text-center">242</td>
							<td className="text-center">2019-09-23</td>
							<td className="text-center">2019-10-06</td>
							<td className="text-right">
								사업주 재검토중 <span className="text-danger">(2019-09-27)</span>
							</td>
						</tr>
					</tbody>
				</Table>
			</CardBody>
		</Card>
	);
};

TransmittalCard.defaultProps = {
	height: 'md'
};

export default TransmittalCard;
