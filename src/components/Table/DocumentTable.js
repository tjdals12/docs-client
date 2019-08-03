import React from 'react';
import { Col, Row, Button, Table } from 'reactstrap';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const DocumentTable = ({
	search,
	currentPage,
	lastPage,
	data,
	onOpenAdd,
	onDelete,
	onOpenDetail,
	checkedList,
	onChecked,
	onCheckedAll,
	onChange,
	onSearch,
	className,
	...rest
}) => {
	const classes = classNames('mt-2 mb-4 bg-white', className);

	return (
		<React.Fragment>
			<Row className="hidden-md hidden-sm hidden-xs">
				<Col xl={2} lg={4}>
					<Button color="primary" className="mr-2" onClick={onOpenAdd}>
						ADD
					</Button>

					<Button color="secondary" onClick={onDelete}>
						DELETE
					</Button>
				</Col>
			</Row>
			<Table className={classes} {...rest}>
				<thead>
					<tr>
						<th width="3%" className="text-center">
							<input type="checkbox" onChange={onCheckedAll} />
						</th>
						<th width="6%" className="text-center">
							Gb
						</th>
						<th width="15%" className="text-center">
							No.
						</th>
						<th width="25%" className="text-center">
							Title
						</th>
						<th width="5%" className="text-center">
							Rev.
						</th>
						<th width="10%" className="text-center">
							Date
						</th>
						<th width="" className="text-center">
							Status
						</th>
						<th width="8%" className="text-center">
							Hold
						</th>
						<th width="7%" className="text-center">
							Delete
						</th>
						<th width="5%" className="text-center">
							Delay
						</th>
						<th width="1%" className="text-center">
							Level
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => {
						let { _id: id, level, delayGb } = item.toJS();

						return (
							<tr key={id}>
								<td>
									<input
										type="checkbox"
										value={id}
										checked={checkedList.includes(id)}
										onChange={onChecked}
									/>
								</td>
								<td className="text-center">{item.getIn([ 'documentGb', 'cdSName' ])}</td>
								<td>{item.get('documentNumber')}</td>
								<td>
									<span className="have-link" onClick={onOpenDetail({ id })}>
										{item.get('documentTitle')}
									</span>
								</td>
								<td className="text-center">{item.get('documentRev')}</td>
								<td className="text-center">{item.getIn([ 'timestamp', 'regDt' ]).substr(0, 10)}</td>
								<td className="text-center">
									{item.getIn([ 'documentStatus', -1, 'statusName' ])}
									<br />
									<small className="text-primary">
										({item.getIn([ 'documentStatus', -1, 'timestamp', 'regDt' ]).substr(0, 10)})
									</small>
								</td>
								<td className="text-center">
									{item.getIn([ 'holdYn', -1, 'yn' ])}
									<br />
									{item.getIn([ 'holdYn', -1, 'yn' ]) === 'YES' && (
										<small className="text-danger font-weight-bold">
											({item.getIn([ 'holdYn', -1, 'effStaDt' ]).substr(0, 10)})
										</small>
									)}
								</td>
								<td className="text-center">
									{item.getIn([ 'deleteYn', 'yn' ])}
									<br />
									{item.getIn([ 'deleteYn', 'yn' ]) === 'YES' && (
										<small className="text-danger font-weight-bold">
											({item.getIn([ 'deleteYn', 'deleteDt' ]).substr(0, 10)})
										</small>
									)}
								</td>
								<td className="text-center">
									{delayGb === '01' ? (
										<span className="text-success">여유</span>
									) : delayGb === '02' ? (
										<span className="text-primary">임박</span>
									) : delayGb === '03' ? (
										<span className="text-warning">오늘</span>
									) : (
										<span className="text-danger">지연</span>
									)}
								</td>
								<td className="text-center">
									{level > 3 ? (
										<span className="text-danger">{level}</span>
									) : level === 3 ? (
										<span className="text-warning">{level}</span>
									) : (
										<span className="text-success">{level}</span>
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</React.Fragment>
	);
};

DocumentTable.propTypes = {
	currentPage: PropTypes.number,
	lastPage: PropTypes.number,
	data: PropTypes.object
};

export default DocumentTable;
