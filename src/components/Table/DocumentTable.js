import React from 'react';
import { Table } from 'reactstrap';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const DocumentTable = ({ data, className, ...rest }) => {
	const classes = classNames('mt-2 mb-2', className);

	return (
		<Table className={classes} {...rest}>
			<thead>
				<tr>
					<th width="3%" className="text-center">
						<input type="checkbox" />
					</th>
					<th className="text-center">No.</th>
					<th className="text-center">Title</th>
					<th className="text-center">Rev.</th>
					<th className="text-center">Date</th>
					<th className="text-center">Status</th>
					<th className="text-center">Hold</th>
					<th className="text-center">Delay</th>
					<th className="text-center">Level</th>
				</tr>
			</thead>
			<tbody>
				{data.map((item, index) => {
					let { level, delayGb } = item.toJS();

					return (
						<tr key={index}>
							<td>
								<input type="checkbox" />
							</td>
							<td>{item.get('documentNumber')}</td>
							<td>{item.get('documentTitle')}</td>
							<td className="text-center">{item.get('documentRev')}</td>
							<td className="text-center">{item.getIn([ 'timestamp', 'regDt' ]).substr(0, 10)}</td>
							<td>
								{item.getIn([ 'documentStatus', -1, 'status' ])}{' '}
								<small className="text-primary">
									({item.getIn([ 'documentStatus', -1, 'timestamp', 'regDt' ]).substr(0, 10)})
								</small>
							</td>
							<td>
								{item.getIn([ 'holdYn', -1, 'yn' ])}{' '}
								<small className="text-danger font-weight-bold">
									({item.getIn([ 'holdYn', -1, 'effStaDt' ]).substr(0, 10)})
								</small>
							</td>
							<td className="text-center">
								{delayGb === '여유' ? (
									<span className="text-success">{delayGb}</span>
								) : delayGb === '임박' ? (
									<span className="text-primary">{delayGb}</span>
								) : delayGb === '오늘' ? (
									<span className="text-warning">{delayGb}</span>
								) : (
									<span className="text-danger">{delayGb}</span>
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
	);
};

DocumentTable.propTypes = {
	data: PropTypes.object
};

export default DocumentTable;
