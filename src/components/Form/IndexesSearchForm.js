import React from 'react';
import { Form, FormGroup, Col, Label, Input, Button } from 'reactstrap';

const IndexesSearchForm = ({ parts, search, onChange }) => {
	return (
		<Form className="bg-white mb-3 px-2 py-2 border rounded hidden-md hidden-sm hidden-xs">
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
						placeholder="ex) R-001"
						value={search.get('partNumber')}
						onChange={onChange}
					/>
				</Col>
				<Label md={1} className="text-right">
					업체명
				</Label>
				<Col md={2}>
					<Input
						type="text"
						name="vendorName"
						placeholder="ex) 한화건설"
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

export default IndexesSearchForm;
