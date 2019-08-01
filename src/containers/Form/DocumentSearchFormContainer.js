import React from 'react';
import DocumentSearchForm from 'components/Form/DocumentSearchForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from 'store/modules/document';

class DocumentSearchFormContainer extends React.Component {
	handleChange = (e) => {
		const { DocumentActions } = this.props;
		const { name, value } = e.target;

		DocumentActions.onChangeSearch({ name, value });
	};

	handleSearch = () => {
		const { search } = this.props;

		console.log(search.toJS());
	};

	render() {
		const { search } = this.props;

		return <DocumentSearchForm search={search} onChange={this.handleChange} onSearch={this.handleSearch} />;
	}
}

export default connect(
	(state) => ({
		search: state.document.get('search')
	}),
	(dispatch) => ({
		DocumentActions: bindActionCreators(documentActions, dispatch)
	})
)(DocumentSearchFormContainer);
