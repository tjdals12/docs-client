import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import VendorCard from 'components/Card/VendorCard';
import Pagination from 'components/Pagination';

const VendorList = ({ page, lastPage, data, onPage, onOpen }) => {
	return (
		<React.Fragment>
			<Row className="hidden-md hidden-sm hidden-xs">
				<Col md={4}>
					<Button color="primary" onClick={onOpen('vendorAdd')}>
						ADD
					</Button>
				</Col>
			</Row>
			<Row className="mt-2">
				{data.map((vendor, index) => (
					<Col xs={12} md={6} lg={3} className="mb-4" key={index}>
						<VendorCard vendor={vendor} />
					</Col>
				))}
			</Row>
			<Pagination
				currentPage={page}
				lastPage={lastPage}
				onPage={onPage}
				size="md"
				aria-label="Page navigation"
				listClassName="flex-row justify-content-end ml-auto"
			/>
		</React.Fragment>
	);
};

export default VendorList;
