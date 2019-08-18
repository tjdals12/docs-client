import React from 'react';
import classNames from 'classnames';
import { Card, CardHeader, CardBody } from 'reactstrap';
import LabelText from 'components/LabelText';
import Typography from 'components/Typography';

const OverallCard = ({ className, ...rest }) => {
	const classes = classNames('w-100 h-100', className);

	return (
		<Card className={classes} {...rest}>
			<CardHeader className="font-weight-bold title-font">Overall</CardHeader>
			<CardBody>
				<Typography type="p" className="text-danger text-right">
					* Document 기준
				</Typography>
				<LabelText label="Total" text="97 개" />
				<LabelText label="Rev.A" text="72 개" />
				<LabelText label="Hold" text="6 개" />
				<LabelText label="Delay" text="12 개" />
			</CardBody>
		</Card>
	);
};

export default OverallCard;
