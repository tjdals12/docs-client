import React from 'react';
import { Row, Col } from 'reactstrap';
import ScrollToTop from 'components/ScrollToTop';
import Page from 'components/Page';
import IndexCardContainer from 'containers/Card/IndexCardContainer';
import UserCard from 'components/Card/UserCard';
import OverallCard from 'components/Card/OverallCard';
import TransmittalCard from 'components/Card/TransmittalCard';
import BarChartCard from 'components/Card/BarChartCard';
import DocumentInfoCard from 'components/Card/DocumentInfoCard';
import queryString from 'query-string';

import userImg from 'assets/img/users/105.png';

class IndexesDetailPage extends React.Component {
	render() {
		const { id } = queryString.parse(this.props.location.search);

		return (
			<ScrollToTop>
				<Page
					title="Index Detail"
					breadcrumbs={[ { name: 'Indexes', active: false }, { name: 'Detail', active: true } ]}
				>
					<IndexCardContainer id={id} />
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
							<OverallCard />
						</Col>
						<Col md={12} lg={6} className="mb-4">
							<BarChartCard title="Status" color1="#6a82fb" color2="#00c9ff" />
						</Col>
					</Row>
					<Row>
						<Col md={12} lg={6} className="mb-4">
							<TransmittalCard />
						</Col>
						<Col md={12} lg={6} className="mb-4">
							<BarChartCard title="Transmittal Receive / Reply" />
						</Col>
					</Row>
					<Row>
						<Col md={12} className="mb-4">
							<DocumentInfoCard />
						</Col>
					</Row>
				</Page>
			</ScrollToTop>
		);
	}
}

export default IndexesDetailPage;
