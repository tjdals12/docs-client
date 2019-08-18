import React from 'react';
import classNames from 'classnames';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const BarChartCard = ({ title, data, color1, color2, className, ...rest }) => {
	const classes = classNames('w-100 h-100', className);

	return (
		<Card className={classes} {...rest}>
			<CardHeader className="title-font">{title}</CardHeader>
			<CardBody>
				<ResponsiveContainer minHeight={300}>
					<BarChart data={data}>
						<CartesianGrid />
						<XAxis dataKey="name" />
						<YAxis />
						<Legend />
						<Tooltip />
						<Bar dataKey="receive" fill={color1} />
						<Bar dataKey="reply" fill={color2} />
					</BarChart>
				</ResponsiveContainer>
			</CardBody>
		</Card>
	);
};

BarChartCard.propTypes = {
	title: PropTypes.string,
	data: PropTypes.object,
	color1: PropTypes.string,
	color2: PropTypes.string,
	className: PropTypes.string
};

BarChartCard.defaultProps = {
	title: 'Chart',
	data: [
		{ name: '1월', receive: 152, reply: 127 },
		{ name: '2월', receive: 64, reply: 87 },
		{ name: '3월', receive: 77, reply: 77 },
		{ name: '4월', receive: 77, reply: 77 },
		{ name: '5월', receive: 77, reply: 77 },
		{ name: 'Total', receive: 293, reply: 297 }
	],
	color1: '#6a82fb',
	color2: '#fc5c7d'
};

export default BarChartCard;
