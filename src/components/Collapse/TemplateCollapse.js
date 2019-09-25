import React from 'react';
import classNames from 'classnames';
import { Collapse, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import FileViewer from 'react-file-viewer';
import PropTypes from 'prop-types';

const makeHeaderCell = ({ title, className }) => {
	const classes = classNames('k-link title-font', className);

	return <span className={classes}>{title}</span>;
};

const demo = [
	{ index: 1, templateGb: '공문', templateName: 'Transmittal 양식', templateType: '.docx' },
	{ index: 2, templateGb: '보고서', templateName: '월간진도보고서 양식', templateType: '.xlsx' },
	{ index: 3, templateGb: '관리', templateName: 'VP 관리 양식', templateType: '.xlsx' },
	{
		index: 4,
		templateGb: '관리',
		templateName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		templateType: '.xlsx'
	}
];

const TemplateCollapse = ({ isOpen }) => {
	return (
		<Collapse isOpen={isOpen} className="mt-3 pt-4 border-top">
			<Row style={{ minHeight: '520px' }}>
				<Col md={4} style={{ maxHeight: '520px', overflow: 'scroll' }}>
					<Grid pageable data={demo} className="h-100 border rounded">
						<Column
							field="index"
							width={40}
							className="text-right"
							headerCell={() => makeHeaderCell({ title: '#', className: 'text-right' })}
						/>
						<Column
							field="templateGb"
							width={80}
							className="text-center"
							headerCell={() => makeHeaderCell({ title: '구분', className: 'text-center' })}
						/>
						<Column
							field="templateName"
							className="text-nowrap"
							headerCell={() => makeHeaderCell({ title: '양식명' })}
						/>
						<Column
							field="templateType"
							width={100}
							className="text-center"
							headerCell={() => makeHeaderCell({ title: '형식', className: 'text-center' })}
						/>
					</Grid>
				</Col>

				<Col
					md={4}
					style={{ maxHeight: '520px', overflow: 'scroll' }}
					className={`pl-4 pr-4 pt-4 pb-1 border rounded bg-light`}
				>
					<Form
						onSubmit={(e) => {
							e.stopPropagation();
						}}
					>
						<FormGroup row>
							<Col md={6}>
								<Label for="templateGb">구분</Label>
								<Input type="select" id="templateGb" name="templateGb">
									<option value="">구분</option>
								</Input>
							</Col>
							<Col md={6}>
								<Label for="templateType">형식</Label>
								<Input type="text" id="templateType" name="templateType" readOnly />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Col md={12}>
								<Label for="templateName">양식명</Label>
								<Input type="text" id="templateName" name="templateName" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Col md={12}>
								<Label for="templateDescription">설명</Label>
								<Input
									type="textarea"
									id="templateDescriptio"
									name="templateDescription"
									style={{ resize: 'none' }}
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="list" md={4}>
								양식 파일
							</Label>
							<Col md={8} className="d-flex justify-content-end">
								<Button className="custom-file-uploader can-click">
									<Input
										type="file"
										name="indexes"
										onChange={(e) => {
											console.log(e.target.files[0]);
										}}
									/>
									Select a file
								</Button>
							</Col>
						</FormGroup>

						<FormGroup row>
							<Col md={12}>
								<Input type="text" name="templatePath" readOnly />
							</Col>
						</FormGroup>

						<FormGroup row className="mt-5 mb-0">
							<Col md={{ offset: 8, size: 4 }} className="d-flex justify-content-end">
								<Button color="primary" size="lg">
									SAVE
								</Button>
							</Col>
						</FormGroup>
					</Form>
				</Col>

				<Col md={4} style={{ maxHeight: '520px', overflow: 'scroll' }}>
					<FileViewer filePath="" fileType="png" />
				</Col>
			</Row>
		</Collapse>
	);
};

TemplateCollapse.propTypes = {
	isOpen: PropTypes.bool,
	className: PropTypes.string
};

TemplateCollapse.defaultProps = {
	isOpen: false
};

export default TemplateCollapse;
