import React from 'react';
import { Pagination as BSPagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPage, pageCount, className, listClassName, ...rest }) => {
	const createPage = (totalPage, pageCount) => {
		let pageNumbers = [];
		let max = totalPage > pageCount ? pageCount : totalPage;

		for (let i = 1; i <= max; i++) {
			pageNumbers.push(
				<PaginationItem key={i} active={i === currentPage}>
					<PaginationLink href="#">{i}</PaginationLink>
				</PaginationItem>
			);
		}

		return pageNumbers;
	};

	return (
		<BSPagination {...rest} className={className} listClassName={listClassName}>
			<PaginationItem disabled>
				<PaginationLink first href="#" />
			</PaginationItem>
			<PaginationItem disabled>
				<PaginationLink previous href="#" />
			</PaginationItem>

			{createPage(totalPage, pageCount)}

			<PaginationItem disabled>
				<PaginationLink next href="#" />
			</PaginationItem>
			<PaginationItem disabled>
				<PaginationLink last href="#" />
			</PaginationItem>
		</BSPagination>
	);
};

Pagination.propTypes = {
	totalPage: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
	pageCount: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
	className: PropTypes.string,
	listClassName: PropTypes.string
};

Pagination.defaultProps = {
	currentPage: 1,
	totalPage: 1,
	pageCount: 5
};

export default Pagination;
