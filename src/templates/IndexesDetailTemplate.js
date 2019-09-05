import React from 'react';
import { Row, Col } from 'reactstrap';
import UserCard from 'components/Card/UserCard';
import OverallCard from 'components/Card/OverallCard';
import TransmittalCard from 'components/Card/TransmittalCard';
import BarChartCard from 'components/Card/BarChartCard';
import DocumentInfoCard from 'components/Card/DocumentInfoCard';

import userImg from 'assets/img/users/105.png';

const IndexesDetailTemplate = ({ data }) => {
	return (
		<React.Fragment>
			<Row>
				<Col md={6} lg={3} className="mb-4">
					<UserCard
						avatar={userImg}
						avatarSize={150}
						title="이성민 사원"
						subtitle="seongmin@minzlog.info"
						text="담당자"
					/>
				</Col>
				<Col md={6} lg={3} className="mb-4">
					<OverallCard data={data.get('overall')} description="Document 기준" />
				</Col>
				<Col md={12} lg={6} className="mb-4">
					<BarChartCard
						data={data.get('statisticsByStatus')}
						title="Status"
						color1="#6a82fb"
						color2="#00c9ff"
					/>
				</Col>
			</Row>
			<Row>
				<Col md={12} lg={6} className="mb-4">
					<TransmittalCard data={data.get('transmittals')} />
				</Col>
				{/* <Col md={12} lg={6} className="mb-4">
					<BarChartCard dataKey="status" title="Transmittal Receive / Reply" />
				</Col> */}
			</Row>
			<Row>
				<Col md={12} className="mb-4">
					<DocumentInfoCard data={data.get('list')} />
				</Col>
			</Row>
		</React.Fragment>
	);
};

export default IndexesDetailTemplate;
