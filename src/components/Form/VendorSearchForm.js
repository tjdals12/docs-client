import React from 'react';
import { Form, FormGroup, Label, Col, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';

const VendorSearchForm = ({ parts, search, onChange, onSearch }) => {
	return (
		<Form className="bg-white mb-3 px-2 py-2 border rounded hidden-md hidden-sm hidden-xs">
			<FormGroup row>
				<Label md={1} className="text-right">
					Gb
				</Label>
				<Col md={2}>
					<Input type="select" name="vendorGb" value={search.get('vendorGb')} onChange={onChange}>
						<option value="">-- Gb --</option>
						<option value="01">계약 업체</option>
						<option value="02">관리 업체</option>
					</Input>
				</Col>
				<Label md={1} className="text-right">
					국가
				</Label>
				<Col md={2}>
					<Input type="select" name="countryCd" value={search.get('countryCd')} onChange={onChange}>
						<option value="">-- 국가 --</option>
						<option value="01">국내</option>
						<option value="02">해외</option>
					</Input>
				</Col>
				<Label md={1} className="text-right">
					업체명
				</Label>
				<Col md={2}>
					<Input
						type="text"
						name="vendorName"
						placeholder="업체명"
						value={search.get('vendorName')}
						onChange={onChange}
					/>
				</Col>
				<Label md={1} className="text-right">
					관리번호
				</Label>
				<Col md={2}>
					<Input
						type="text"
						name="officialName"
						placeholder="ex) MCU"
						value={search.get('officialName')}
						onChange={onChange}
					/>
				</Col>
			</FormGroup>

			<FormGroup row>
				<Label md={1} className="text-right">
					공종명
				</Label>
				<Col md={2}>
					<Input type="select" name="part" value={search.get('part')} onChange={onChange}>
						<option value="">-- 공종 --</option>
						{parts.get('cdMinors').map((code) => (
							<option key={code.get('_id')} value={code.get('_id')}>
								{code.get('cdSName')}
							</option>
						))}
					</Input>
				</Col>
				<Label md={1} className="text-right">
					공종번호
				</Label>
				<Col md={2}>
					<Input
						type="text"
						name="partNumber"
						value={search.get('partNumber')}
						placeholder="R-001"
						onChange={onChange}
					/>
				</Col>
				<Label md={1} className="text-right">
					계약기간
				</Label>
				<Col md={4}>
					<InputGroup id="regDt">
						<InputGroupAddon addonType="prepend">
							<Input type="date" name="effStaDt" value={search.get('effStaDt')} onChange={onChange} />
						</InputGroupAddon>
						<Input defaultValue="~" className="bg-light" />
						<InputGroupAddon addonType="append">
							<Input type="date" name="effDtEnd" value={search.get('effEndDt')} onChange={onChange} />
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
					<Button color="primary" className="w-100" onClick={onSearch}>
						SEARCH
					</Button>
				</Col>
			</FormGroup>
		</Form>
	);
};

export default VendorSearchForm;
