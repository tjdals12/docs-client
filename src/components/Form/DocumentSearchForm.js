import React from 'react';
import { Col, Form, FormGroup, InputGroup, InputGroupAddon, Input, Label, Button } from 'reactstrap';

const DocumentSearchForm = ({ search, onChange, onSearch }) => {
	return (
		<Form
			className="bg-white mb-3 px-2 py-2 border rounded"
			onSubmit={(e) => {
				e.preventDefault();

				onSearch();
			}}
		>
			<FormGroup row>
				<Label md={1} for="documentGb" className="text-right">
					Gb
				</Label>
				<Col md={2}>
					<Input type="select" name="documentGb" id="documentGb" onChange={onChange}>
						<option value="">-- Gb --</option>
						<option value="01">절차서</option>
						<option value="02">보고서</option>
						<option value="03">도면</option>
					</Input>
				</Col>
				<Label md={1} for="documentNumber" className="text-right">
					No.
				</Label>
				<Col md={2}>
					<Input
						type="text"
						name="documentNumber"
						id="documentNumber"
						onChange={onChange}
						value={search.get('documentNumber')}
					/>
				</Col>
				<Label md={1} for="documentTitle" className="text-right">
					Title
				</Label>
				<Col md={2}>
					<Input
						type="text"
						name="documentTitle"
						id="documentTitle"
						value={search.get('documentTitle')}
						onChange={onChange}
					/>
				</Col>
				<Label md={1} for="documentRev" className="text-right">
					Revision
				</Label>
				<Col md={2}>
					<InputGroup>
						<InputGroupAddon addonType="prepend">Rev.</InputGroupAddon>
						<Input
							type="text"
							name="documentRev"
							id="documentRev"
							onChange={onChange}
							value={search.get('documentRev')}
						/>
					</InputGroup>
				</Col>
			</FormGroup>

			<FormGroup row>
				<Label md={1} for="documentStatus" className="text-right">
					Status
				</Label>
				<Col md={2}>
					<Input
						type="select"
						name="documentStatus"
						id="documentStatus"
						defaultValue={search.get('documentStatus')}
						onChange={onChange}
					>
						<option value="">-- Status --</option>
						<option value="01">접수</option>
						<option value="02">내부 검토중</option>
					</Input>
				</Col>
				<Label md={1} for="holdYn" className="text-right">
					Hold
				</Label>
				<Col md={2}>
					<Input
						type="select"
						name="holdYn"
						id="holdYn"
						defaultValue={search.get('holdYn')}
						onChange={onChange}
					>
						<option value="">-- Y/N --</option>
						<option value="01">YES</option>
						<option value="02">NO</option>
					</Input>
				</Col>
				<Label md={1} for="deleteYn" className="text-right">
					Delete
				</Label>
				<Col md={2}>
					<Input
						type="select"
						name="deleteYn"
						id="deleteYn"
						defaultValue={search.get('deleteYn')}
						onChange={onChange}
					>
						<option value="">-- Y/N --</option>
						<option value="01">YES</option>
						<option value="02">NO</option>
					</Input>
				</Col>
				<Label md={1} for="delayGb" className="text-right">
					Status
				</Label>
				<Col md={2}>
					<Input
						type="select"
						name="delayGb"
						id="delayGb"
						defaultValue={search.get('delayGb')}
						onChange={onChange}
					>
						<option value="">-- Delay --</option>
						<option value="01">여유</option>
						<option value="02">임박</option>
						<option value="03">당일</option>
						<option value="04">지연</option>
					</Input>
				</Col>
			</FormGroup>
			<FormGroup row className="mb-0">
				<Label md={1} for="regDt" className="text-right">
					접수일
				</Label>
				<Col md={4}>
					<InputGroup id="regDt">
						<InputGroupAddon addonType="prepend">
							<Input type="date" name="regDtSta" value={search.get('regDtSta')} onChange={onChange} />
						</InputGroupAddon>
						<Input defaultValue="~" className="bg-light" />
						<InputGroupAddon addonType="append">
							<Input type="date" name="regDtEnd" value={search.get('regDtEnd')} onChange={onChange} />
						</InputGroupAddon>
					</InputGroup>
				</Col>
				<Label md={{ size: 1, offset: 1 }} for="level" className="text-right">
					Level
				</Label>
				<Col md={2}>
					<Input type="select" name="level" id="level" value={search.get('level')} onChange={onChange}>
						<option value="">-- Level --</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</Input>
				</Col>

				<Col md={3}>
					<Button className="w-100" color="primary">
						SEARCH
					</Button>
				</Col>
			</FormGroup>
		</Form>
	);
};

export default DocumentSearchForm;
