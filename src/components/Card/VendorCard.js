import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Badge } from 'reactstrap';
import { MdSearch } from 'react-icons/md';
import classNames from 'classnames';
import Mechnical from 'assets/img/part/mechnical.jpg';
import Stationary from 'assets/img/part/stationary.jpg';
import Electric from 'assets/img/part/electric.jpg';
import Instrument from 'assets/img/part/instrument.jpg';
import Piping from 'assets/img/part/pipe.jpg';
import Firefight from 'assets/img/part/firefight.jpg';
import HVAC from 'assets/img/part/hvac.jpg';

const VendorCard = ({ vendor, className, ...restProps }) => {
	const classes = classNames('can-click hover', className);
	const part = vendor.getIn([ 'part', 'cdMinor' ]);

	return (
		<Card className={classes} {...restProps}>
			<CardImg
				top
				src={
					part === '0001' ? (
						Mechnical
					) : part === '0002' ? (
						Stationary
					) : part === '0003' ? (
						Electric
					) : part === '0004' ? (
						Instrument
					) : part === '0005' ? (
						Piping
					) : part === '0006' ? (
						Firefight
					) : (
						HVAC
					)
				}
				height="150"
			/>
			<CardBody className="position-relative">
				<MdSearch size={25} className="position-absolute" style={{ top: 10, right: 10 }} />
				<CardTitle>
					{vendor.get('vendorName')}
					<CardSubtitle tag="span" className="ml-2">
						({`${vendor.get('countryCd')} / ${vendor.get('vendorGb')}`})
					</CardSubtitle>
				</CardTitle>
				<CardSubtitle className="mb-3">
					<Badge color="info" className="mr-2 px-2 py-1">
						{vendor.getIn([ 'part', 'cdSName' ])}
					</Badge>
					<Badge color="info" className="mr-2 px-2 py-1">
						{vendor.get('partNumber')}
					</Badge>
					<Badge color="info" className="mr-2 px-2 py-1">
						{vendor.get('officialName')}
					</Badge>
				</CardSubtitle>
				<CardSubtitle className="text-muted">
					계약: {vendor.get('effStaDt').substr(0, 10)} ~ {vendor.get('effEndDt').substr(0, 10)}
				</CardSubtitle>
			</CardBody>
		</Card>
	);
};

export default VendorCard;
