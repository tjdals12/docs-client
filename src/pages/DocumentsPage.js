import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import SearchForm from 'components/SearchForm';
import Page from 'components/Page';
import DocumentTableContainer from 'containers/DocumentTableContainer';
import DocumentAddModal from 'components/Modal/DocumentAddModal';
import queryString from 'query-string';

class DocumentsPage extends React.Component {
	state = {
		isOpenAdd: false
	};

	handleClick = (name) => () => {
		this.setState((prevState) => {
			let isOpen = prevState[`isOpen${name}`];

			return {
				[`isOpen${name}`]: !isOpen
			};
		});
	};

	render() {
		const { page } = queryString.parse(this.props.location.search);

		return (
			<Page title="Documents" breadcrumbs={[ { name: 'Documents', active: true } ]}>
				<Row className="mb-2 hidden-md hidden-sm hidden-xs">
					<Col xl={2} lg={4} md={4}>
						<Button color="primary" className="mr-2" onClick={this.handleClick('Add')}>
							ADD
						</Button>

						<Button color="secondary">DELETE</Button>
					</Col>

					<Col xl={{ size: 2, offset: 8 }} lg={{ size: 4, offset: 4 }} md={{ size: 2, offset: 5 }} xs={12}>
						<SearchForm />
					</Col>
				</Row>

				<DocumentTableContainer page={parseInt(page, 10)} />

				<DocumentAddModal isOpen={this.state.isOpenAdd} toggle={this.handleClick('Add')} />
			</Page>
		);
	}
}

export default DocumentsPage;
