import React from 'react';
import classNames from 'classnames';
import { Card, CardHeader, CardBody } from 'reactstrap';
import DocumentInfoTable from 'components/Table/DocumentInfoTable';
import PropTypes from 'prop-types';

const heightMap = {
	sm: {
		minHeight: '200px',
		maxHeight: '400px'
	},
	md: {
		minHeight: '200px',
		maxHeight: '600px'
	},
	lg: {
		minHeight: '200px',
		maxHeight: '800px'
	}
};

const DocumentInfoCard = ({ height, className, ...rest }) => {
	const classes = classNames('w-100 h-100', className);

	return (
		<Card className={classes} {...rest}>
			<CardHeader className="title-font">Document Info</CardHeader>
			<CardBody className="p-2" style={{ ...heightMap[height] }}>
				<DocumentInfoTable />
			</CardBody>
		</Card>
	);
};

DocumentInfoCard.propTypes = {
	height: PropTypes.string,
	className: PropTypes.string
};

DocumentInfoCard.defaultProps = {
	height: 'lg'
};

export default DocumentInfoCard;
