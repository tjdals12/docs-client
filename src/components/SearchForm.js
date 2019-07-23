import React from 'react';
import { Form, Input } from 'reactstrap';
import { MdSearch } from 'react-icons/md';
import bn from 'utils/bemnames';

const bem = bn.create('search-form');

class SearchForm extends React.Component {
	render() {
		return (
			<Form inline className={bem.b()}>
				<MdSearch size={20} className={bem.e('icon-search')} />
				<Input type="search" placeholder="Search..." className={bem.e('input')} />
			</Form>
		);
	}
}

export default SearchForm;
