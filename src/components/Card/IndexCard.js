import React from 'react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardSubtitle,
	CardText,
	Row,
	Col,
	Progress,
	Button,
	ButtonGroup
} from 'reactstrap';
import { FaCaretRight } from 'react-icons/fa';
import { MdAccessAlarm, MdSearch } from 'react-icons/md';
import Typography from 'components/Typography';

const fontStyle = {
	fontFamily: 'Do Hyeon, sans-serif'
};

const IndexCard = ({ data, onDetail, onOpenQuestion, onTarget, onOpenEdit }) => {
	return (
		<Card className="mb-3">
			<CardHeader className="bg-white">
				<Row>
					<Col md={4} className="d-flex align-items-start justify-content-center flex-column">
						<CardTitle className="m-0">
							<Typography type="p" className="mb-2">
								{data.getIn([ 'vendor', 'partNumber' ])} ({data.getIn([ 'vendor', 'part', 'cdSName' ])})
								/ {data.getIn([ 'vendor', 'vendorName' ])}
							</Typography>
							<Typography type="h5" style={fontStyle}>
								{data.getIn([ 'vendor', 'itemName' ])}
							</Typography>
						</CardTitle>
					</Col>
					<Col md={4}>
						<div className="d-flex justify-content-between">
							<CardSubtitle className="pb-2" style={fontStyle}>
								<FaCaretRight size={20} className="pb-1" />계약기간 진행율
							</CardSubtitle>
							<CardSubtitle className="text-secondary small">
								<MdAccessAlarm size={20} className="pb-1 mr-1" />
								{data.getIn([ 'vendor', 'period', 'leftMonth' ])} months left
							</CardSubtitle>
						</div>

						<Progress color="secondary" value={data.getIn([ 'vendor', 'period', 'percent' ])} />

						<CardText className="d-flex justify-content-between">
							<Typography tag="span" className="text-left text-muted small">
								{data.getIn([ 'vendor', 'effStaDt' ]).substr(0, 10)} ~{' '}
								{data.getIn([ 'vendor', 'effEndDt' ]).substr(0, 10)}
							</Typography>
							<Typography tag="span" className="text-right text-muted small">
								{data.getIn([ 'vendor', 'period', 'percent' ])}%
							</Typography>
						</CardText>
					</Col>
					<Col md={4} className="d-flex align-items-center justify-content-end">
						<ButtonGroup className="mr-4">
							<Button
								color="primary"
								onClick={() => {
									onTarget(data.get('_id'));

									onOpenEdit(data.get('_id'))();
								}}
							>
								EDIT
							</Button>
							<Button
								color="danger"
								onClick={() => {
									onTarget(data.get('_id'));

									onOpenQuestion();
								}}
							>
								DELETE
							</Button>
						</ButtonGroup>
						<MdSearch size={25} onClick={onDetail} className="can-click hover" />
					</Col>
				</Row>
			</CardHeader>
		</Card>
	);
};

export default IndexCard;
