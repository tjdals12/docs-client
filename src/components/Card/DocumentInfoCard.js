import React from 'react';
import classNames from 'classnames';
import { Card, CardHeader, CardBody } from 'reactstrap';
import DocumentInfoTableContainer from 'containers/Table/DocumentInfoTableContainer';
import Typography from 'components/Typography';
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

const DocumentInfoCard = ({ data, height, className, ...rest }) => {
	const classes = classNames('w-100 h-100', className);

	return (
		<Card className={classes} {...rest}>
			<CardHeader className="title-font">Document Info</CardHeader>
			<CardBody className="p-2" style={{ ...heightMap[height] }}>
				{data.size === 0 ? (
					<Typography type="h5" className="text-center font-italic mt-2">
						데이터가 없습니다.
					</Typography>
				) : (
					<DocumentInfoTableContainer data={data} />
				)}
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
