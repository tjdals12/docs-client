import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import IndexCard from 'components/Card/IndexCard';
import QuestionModal from 'components/Modal/QuestionModal';
import Pagination from 'components/Pagination';
import PropTypes from 'prop-types';

const IndexList = ({
	page,
	lastPage,
	data,
	isOpenQuestion,
	onOpenQuestion,
	onClose,
	onOpenAdd,
	onTarget,
	onDetailPage,
	onDeleteIndex,
	onOpenEdit,
	onOpenInfoAdd,
	onPage
}) => {
	return (
		<React.Fragment>
			<QuestionModal
				isOpen={isOpenQuestion}
				onClose={onClose}
				size="md"
				header="Document Index 삭제"
				body={
					<div>
						<p className="m-0">선택 값을 삭제하시겠습니까?</p>
						<p className="m-0 text-danger">(* 삭제된 데이터 복구되지 않습니다.)</p>
					</div>
				}
				footer={
					<Button color="primary" onClick={onDeleteIndex}>
						DELETE
					</Button>
				}
			/>

			<Row className="hidden-md hidden-sm hidden-xs">
				<Col md={4}>
					<Button color="primary" className="mr-2" onClick={onOpenAdd}>
						ADD
					</Button>
					<Button color="secondary" onClick={onOpenInfoAdd}>
						ADD DOCUMENT
					</Button>
				</Col>
			</Row>
			<Row className="mt-2 mb-2">
				<Col md={12}>
					{data.map((item, index) => {
						return (
							<IndexCard
								key={index}
								data={item}
								type="list"
								onDetail={onDetailPage}
								onOpenQuestion={onOpenQuestion}
								onTarget={onTarget}
								onOpenEdit={onOpenEdit}
							/>
						);
					})}
				</Col>
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

IndexList.propTypes = {
	data: PropTypes.object,
	isOpenQuestion: PropTypes.bool,
	onOpenQuestion: PropTypes.func,
	onClose: PropTypes.func,
	onOpenAdd: PropTypes.func,
	onTarget: PropTypes.func,
	onDetailPage: PropTypes.func,
	onDeleteIndex: PropTypes.func,
	onOpenEdit: PropTypes.func,
	onOpenInfoAdd: PropTypes.func
};

IndexList.defaultProps = {
	onOpenQuestion: () => console.warn('Warning: onOpenQuestion is not defined'),
	onClose: () => console.warn('Warning: onClose is not defined'),
	onOpenAdd: () => console.warn('Warning: onOpenAdd is not defined'),
	onTarget: () => console.warn('Warning: onTarget is not defined'),
	onDetailPage: () => console.warn('Warning: onDetailPage is not defined'),
	onDeleteIndex: () => console.warn('Warning: onDeleteIndex is not defined'),
	onOpenEdit: () => console.warn('Warning: onOpenEdit is not defined'),
	onOpenInfoAdd: () => console.warn('Warning: onOpenInfoAdd is not defined')
};

export default IndexList;
