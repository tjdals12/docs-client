import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import IndexCard from 'components/Card/IndexCard';

const IndexList = ({ data, onDetail }) => {
	return (
		<React.Fragment>
			<Row className="hidden-md hidden-sm hidden-xs">
				<Col md={4}>
					<Button color="primary" className="mr-2">
						CREATE
					</Button>
					<Button color="secondary">ADD DOCUMENT</Button>
				</Col>
			</Row>
			<Row className="mt-2">
				<Col md={12}>
					{data.map((item, index) => {
						return <IndexCard key={index} data={item} onDetail={onDetail} />;
					})}
				</Col>
			</Row>
		</React.Fragment>
	);
};

export default IndexList;
