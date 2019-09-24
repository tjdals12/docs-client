import React from 'react';
import classNames from 'classnames';
import { Card, Row, Col, Button } from 'reactstrap';
import { FaCircle } from 'react-icons/fa';
import Typography from 'components/Typography';
import PropTypes from 'prop-types';

const CollapseCard = ({ onOpen, onAddForm, collapse: Collapse, className }) => {
	const classes = classNames('px-4 py-3', className);

	return (
		<Card className={classes}>
			<Row onClick={onOpen} className="align-items-center">
				<Col md={3}>
					<Typography type="h2" className="m-0 title-font">
						<FaCircle size={10} className="mr-2" /> 프로젝트 관리
					</Typography>
				</Col>
				<Col md={6}>
					<small className="text-danger">* 관리하는 프로젝트 목록</small>
				</Col>
				<Col md={3} className="d-flex align-items-center justify-content-end">
					<Button
						color="secondary"
						className="mr-2"
						onClick={(e) => {
							e.stopPropagation();

							onAddForm();
						}}
					>
						ADD
					</Button>
				</Col>
			</Row>

			{Collapse}
		</Card>
	);
};

CollapseCard.propTypes = {
	isOpen: PropTypes.bool,
	className: PropTypes.string
};

CollapseCard.defaultProps = {
	isOpen: false
};

export default CollapseCard;
