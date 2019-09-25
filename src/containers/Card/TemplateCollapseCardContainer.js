import React from 'react';
import CollapseCard from 'components/Card/CollapseCard';
import TemplateCollapse from 'components/Collapse/TemplateCollapse';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TemplateCollapseCardContainer extends React.Component {
	state = {
		isOpen: false
	};

	handleOpen = () => {
		this.setState((prevState) => {
			const { isOpen } = prevState;

			return {
				isOpen: !isOpen
			};
		});
	};

	render() {
		return (
			<CollapseCard
				title="양식 관리"
				description="사용하는 양식 관리"
				onOpen={this.handleOpen}
				collapse={<TemplateCollapse isOpen={this.state.isOpen} />}
			/>
		);
	}
}

export default connect((state) => ({}), (dispatch) => ({}))(TemplateCollapseCardContainer);
