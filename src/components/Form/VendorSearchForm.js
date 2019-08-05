import React from 'react';
import { Form, FormGroup, Label, Col, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';

const VendorSearchForm = () => {
	return (
		<Form className="bg-white mb-3 px-2 py-2 border rounded">
			<FormGroup row>
				<Label md={1} className="text-right">
					Gb
				</Label>
				<Col md={2}>
					<Input type="select" name="vendorGb">
						<option value="">-- Gb --</option>
						<option value="01">계약 업체</option>
						<option value="02">관리 업체</option>
					</Input>
				</Col>
				<Label md={1} className="text-right">
					국가
				</Label>
				<Col md={2}>
					<Input type="select" name="countryCd">
						<option value="">-- 국가 --</option>
						<option value="01">국내</option>
						<option value="02">해외</option>
					</Input>
				</Col>
				<Label md={1} className="text-right">
					업체명
				</Label>
				<Col md={2}>
					<Input type="text" name="vendorName" placeholder="업체명" />
				</Col>
				<Label md={1} className="text-right">
					관리번호
				</Label>
				<Col md={2}>
					<Input type="text" name="officialName" placeholder="ex) MCU" />
				</Col>
			</FormGroup>

			<FormGroup row>
				<Label md={1} className="text-right">
					공종명
				</Label>
				<Col md={2}>
					<Input type="select" name="part">
						<option value="">-- 공종 --</option>
						<option value="01">기계</option>
						<option value="02">장치</option>
					</Input>
				</Col>
				<Label md={1} className="text-right">
					공종번호
				</Label>
				<Col md={2}>
					<Input type="text" name="partNumber" placeholder="R-001" />
				</Col>
				<Label md={1} className="text-right">
					계약기간
				</Label>
				<Col md={4}>
					<InputGroup id="regDt">
						<InputGroupAddon addonType="prepend">
							<Input type="date" name="regDtSta" />
						</InputGroupAddon>
						<Input defaultValue="~" className="bg-light" />
						<InputGroupAddon addonType="append">
							<Input type="date" name="regDtEnd" />
						</InputGroupAddon>
					</InputGroup>
				</Col>
				<Col md={1}>
					<Button color="dark" className="w-100">
						초기화
					</Button>
				</Col>
			</FormGroup>

			<FormGroup row className="mb-0">
				<Col md={{ size: 3, offset: 9 }}>
					<Button color="primary" className="w-100">
						SEARCH
					</Button>
				</Col>
			</FormGroup>
		</Form>
	);
};

export default VendorSearchForm;
