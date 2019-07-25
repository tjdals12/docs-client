import React from 'react';
import { Pagination as BSPagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, lastPage, className, listClassName, ...rest }) => {
	const createPage = (currentPage, lastPage) => {
		let pageNumbers = [];

		for (let i = 1; i <= lastPage; i++) {
			pageNumbers.push(
				<PaginationItem key={i} active={i === currentPage}>
					<PaginationLink href={`/documents?page=${i}`}>{i}</PaginationLink>
				</PaginationItem>
			);
		}

		return pageNumbers;
	};

	return (
		<BSPagination {...rest} className={className} listClassName={listClassName}>
			<PaginationItem disabled={currentPage === 1}>
				<PaginationLink first href="/documents?page=1" />
			</PaginationItem>
			<PaginationItem disabled={currentPage === 1}>
				<PaginationLink previous href={`/documents?page=${currentPage - 1}`} />
			</PaginationItem>

			{createPage(currentPage, lastPage)}

			<PaginationItem disabled={currentPage === lastPage}>
				<PaginationLink next href={`/documents?page=${currentPage + 1}`} />
			</PaginationItem>
			<PaginationItem disabled={currentPage === lastPage}>
				<PaginationLink last href={`/documents?page=${lastPage}`} />
			</PaginationItem>
		</BSPagination>
	);
};

Pagination.propTypes = {
	currentPage: PropTypes.number,
	lastPage: PropTypes.number,
	className: PropTypes.string,
	listClassName: PropTypes.string
};

Pagination.defaultProps = {
	currentPage: 1,
	lastPage: 1
};

export default Pagination;
