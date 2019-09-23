import React from 'react';
import classNames from 'classnames';
import { Card, Collapse, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FaCircle } from 'react-icons/fa';
import Typography from 'components/Typography';
import PropTypes from 'prop-types';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

const makeHeaderCell = ({ title, className }) => {
	const classes = classNames('k-link title-font', className);

	return <span className={classes}>{title}</span>;
};

const CollapseCard = ({ gbs, data, detail, total, lastPage, isOpen, onOpen, onSelect, className, ...rest }) => {
	const classes = classNames('px-4 py-3', className);

	const rowRender = (Row, props) => {
		const isActive = props.dataItem._id === detail.get('_id');

		return React.cloneElement(Row, {
			className: classNames(isActive && 'bg-gradient-theme-left text-white ', 'can-click', Row.props.className)
		});
	};

	return (
		<Card className={classes} {...rest}>
			<Row onClick={onOpen} className="align-items-center">
				<Col md={3}>
					<Typography type="h2" className="m-0 title-font">
						<FaCircle size={10} className="mr-2" /> 프로젝트 관리
					</Typography>
				</Col>
				<Col md={6}>
					<small className="text-danger">* 관리하는 프로젝트 목록</small>
				</Col>
				<Col md={3} className="d-flex align-items-center justify-content-end">
					<Button color="secondary" className="mr-2">
						ADD
					</Button>
				</Col>
			</Row>

			<Collapse isOpen={isOpen} className="mt-3 pt-4 border-top">
				<Row style={{ minHeight: '600px' }}>
					<Col md={6} style={{ maxHeight: '600px', overflow: 'scroll' }}>
						<Grid
							pageable
							data={data.toJS()}
							total={total}
							take={10}
							skip={(lastPage - 1) * 10}
							onPageChange={() => console.warn('Pagination')}
							onRowClick={(e) => onSelect(e)}
							className="h-100 border rounded"
							rowRender={rowRender}
						>
							<Column
								field="index"
								title="#"
								width={40}
								className="text-right"
								headerCell={() => makeHeaderCell({ title: '#', className: 'text-right' })}
							/>
							<Column
								field="projectGb.cdSName"
								title="구분"
								width={60}
								className="text-center"
								headerCell={() => makeHeaderCell({ title: '구분', className: 'text-center' })}
							/>
							<Column
								field="projectName"
								title="프로젝트명"
								headerCell={() => makeHeaderCell({ title: '프로젝트명' })}
							/>
							<Column
								field="client"
								title="발주처"
								width={100}
								className="text-nowrap"
								headerCell={() => makeHeaderCell({ title: '발주처' })}
							/>
							<Column
								field="period"
								title="계약기간"
								width={180}
								headerCell={() => makeHeaderCell({ title: '계약기간' })}
							/>
						</Grid>
					</Col>
					<Col
						md={6}
						className="pl-4 pr-4 pt-4 pb-1 border rounded bg-light"
						style={{ maxHeight: '600px', overflow: 'scroll' }}
					>
						<Form
							onSubmit={(e) => {
								e.preventDefault();
							}}
						>
							<FormGroup row>
								<Col md={3}>
									<Label for="projectGb" className="title-font">
										구분
									</Label>
									<Input
										type="select"
										id="projectGb"
										name="projectGb"
										value={detail.getIn([ 'projectGb', '_id' ])}
									>
										<option value="">-- 구분 --</option>
										{gbs.get('cdMinors').map((gb) => (
											<option key={gb.get('_id')} value={gb.get('_id')}>
												{gb.get('cdSName')}
											</option>
										))}
									</Input>
								</Col>
								<Col md={6}>
									<Label for="projectName" className="title-font">
										프로젝트명
									</Label>
									<Input
										type="text"
										id="projectName"
										name="projectName"
										defaultValue={detail.get('projectName')}
									/>
								</Col>
								<Col md={3}>
									<Label for="projectCode" className="title-font">
										프로젝트 코드
									</Label>
									<Input
										type="text"
										id="projectCode"
										name="projectCode"
										defaultValue={detail.get('projectCode')}
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Col md={6}>
									<Label for="effStaDt" className="title-font">
										시작일
									</Label>
									<Input
										type="date"
										id="effStaDt"
										name="effStaDt"
										defaultValue={detail.get('effStaDt') && detail.get('effStaDt').substr(0, 10)}
									/>
								</Col>
								<Col md={6}>
									<Label for="effEndDt" className="title-font">
										종료일
									</Label>
									<Input
										type="date"
										id="effEndDt"
										name="effEndDt"
										defaultValue={detail.get('effEndDt') && detail.get('effEndDt').substr(0, 10)}
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Col md={6}>
									<Label for="client" className="title-font">
										발주처
									</Label>
									<Row id="client">
										<Col md={8}>
											<Input type="text" name="client" defaultValue={detail.get('client')} />
										</Col>
										<Col md={4}>
											<Input
												type="text"
												defaultValue={detail.get('clientCode')}
												name="clientCode"
											/>
										</Col>
									</Row>
								</Col>

								<Col md={6}>
									<Label for="contractor" className="title-font">
										시공사
									</Label>
									<Row id="contractor">
										<Col md={8}>
											<Input
												type="text"
												name="contractor"
												defaultValue={detail.get('contractor')}
											/>
										</Col>
										<Col md={4}>
											<Input
												type="text"
												name="contractorCode"
												defaultValue={detail.get('contractorCode')}
											/>
										</Col>
									</Row>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Col md={12}>
									<Label for="memo" className="title-font">
										설명
									</Label>
									<Input
										type="textarea"
										name="설명"
										style={{ height: '150px', resize: 'none' }}
										value={detail.get('memo')}
									/>
								</Col>
							</FormGroup>
							<FormGroup row className="mt-5 mb-0">
								<Col md={{ offset: 8, size: 4 }} className="d-flex justify-content-end">
									{detail.size > 0 && (
										<Button size="lg" color="primary" className="mr-2">
											SAVE
										</Button>
									)}

									<Button size="lg" color="danger">
										DELETE
									</Button>
								</Col>
							</FormGroup>
						</Form>
					</Col>
				</Row>
			</Collapse>
		</Card>
	);
};

CollapseCard.propTypes = {
	isOpen: PropTypes.bool,
	className: PropTypes.string
};

CollapseCard.defaultProps = {
	isOpen: false
};

export default CollapseCard;
