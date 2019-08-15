import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import IndexCard from 'components/Card/IndexCard';
import QuestionModal from 'components/Modal/QuestionModal';

const IndexList = ({
	data,
	isOpenQuestion,
	onOpenQuestion,
	onClose,
	onOpenAdd,
	onTarget,
	onDetailPage,
	onDeleteIndex,
	onOpenEdit,
	onOpenInfoAdd
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
			<Row className="mt-2">
				<Col md={12}>
					{data.map((item, index) => {
						return (
							<IndexCard
								key={index}
								data={item}
								onDetail={onDetailPage}
								onOpenQuestion={onOpenQuestion}
								onTarget={onTarget}
								onOpenEdit={onOpenEdit}
							/>
						);
					})}
				</Col>
			</Row>
		</React.Fragment>
	);
};

export default IndexList;
