import React from 'react';
import { Table } from 'reactstrap';
import { MdSubdirectoryArrowRight } from 'react-icons/md';
import Typography from 'components/Typography';

const DocumentInfoTable = ({ data, className, ...rest }) => {
	return (
		<Table className={className} {...rest}>
			<colgroup>
				<col width="25%" />
				<col width="35%" />
				<col width="15%" />
				<col width="10%" />
				<col width="15%" />
			</colgroup>
			<thead>
				<tr>
					<th>No.</th>
					<th>Title</th>
					<th className="text-left">Date</th>
					<th className="text-center">삭제여부</th>
					<th className="text-center">등록정보</th>
				</tr>
			</thead>
			<tbody>
				{data.map((documentInfo, index) => {
					return (
						<React.Fragment key={index}>
							<tr className="border-right">
								<td>{documentInfo.documentNumber}</td>
								<td>{documentInfo.documentTitle}</td>
								<td className="text-left">{documentInfo.plan} 예정</td>
								<td className="text-center">
									{documentInfo.removeYn.yn} ({documentInfo.removeYn.deleteDt.substr(0, 10)})
								</td>
								<td className="text-danger text-right">
									{documentInfo.timestamp.regId} ({documentInfo.timestamp.regDt})<br />
									{documentInfo.timestamp.updId} ({documentInfo.timestamp.updDt})
								</td>
							</tr>
							{documentInfo.trackingDocument.map((document) => (
								<tr key={document._id} className="bg-light">
									<td>
										<MdSubdirectoryArrowRight size={25} className="pb-2 text-secondary" />
										<span className="pl-2">{document.documentNumber}</span>
									</td>
									<td className="pl-4 text-primary can-click have-link">
										{document.documentTitle}
										<Typography tag="span" className="pl-5">
											Rev.A
										</Typography>
									</td>
									<td className="pl-4 text-left">
										2019-09-20 접수<br />
										<Typography tag="span" className="text-right text-primary can-click have-link">
											(ABC-DEF-T-R-001-001)
										</Typography>
									</td>
									<td colSpan={2} className="text-left">
										사업주 재검토중 (2019-09-31)
									</td>
								</tr>
							))}
						</React.Fragment>
					);
				})}
			</tbody>
		</Table>
	);
};

DocumentInfoTable.defaultProps = {
	data: [
		{
			documentNumber: 'VP-NCC-R-001-001',
			documentTitle: 'Vendor Print Index & Schedule',
			plan: '2019-09-21',
			removeYn: {
				yn: 'YES',
				deleteDt: '2019-08-16 21:08:35',
				timestamp: {
					regId: 'SYSTEM',
					regDt: '2019-08-16 21:08:35',
					updId: 'SYSTEM',
					updDt: '2019-08-16 21:08:35'
				}
			},
			trackingDocument: [
				{
					_id: 'asdwdasdwad',
					documentNumber: 'VP-NCC-R-001-001',
					documentTitle: 'Vendor Print Index & Schedule',
					documentRev: 'A'
				},
				{
					_id: 'asdwdasdwa2',
					documentNumber: 'VP-NCC-R-001-001',
					documentTitle: 'Vendor Print Index & Schedule',
					documentRev: 'B'
				},
				{
					_id: 'asdwdasdwa1',
					documentNumber: 'VP-NCC-R-001-001',
					documentTitle: 'Vendor Print Index & Schedule',
					documentRev: 'C'
				}
			],
			timestamp: {
				regId: 'SYSTEM',
				regDt: '2019-08-16 21:08:35',
				updId: 'SYSTEM',
				updDt: '2019-08-16 21:08:35'
			}
		},
		{
			documentNumber: 'VP-NCC-R-001-002',
			documentTitle: 'Sub-Vendor',
			plan: '2019-09-21',
			removeYn: {
				yn: 'YES',
				deleteDt: '2019-08-16 21:08:35',
				timestamp: {
					regId: 'SYSTEM',
					regDt: '2019-08-16 21:08:35',
					updId: 'SYSTEM',
					updDt: '2019-08-16 21:08:35'
				}
			},
			trackingDocument: [
				{
					_id: 'asdwdasdwad',
					documentNumber: 'VP-NCC-R-001-002',
					documentTitle: 'Sub-Vendor List',
					documentRev: 'A'
				},
				{
					_id: 'asdwdasdwa2',
					documentNumber: 'VP-NCC-R-001-002',
					documentTitle: 'Sub-Vendor List',
					documentRev: 'B'
				},
				{
					_id: 'asdwdasdwa1',
					documentNumber: 'VP-NCC-R-001-002',
					documentTitle: 'Sub-Vendor List',
					documentRev: 'C'
				}
			],
			timestamp: {
				regId: 'SYSTEM',
				regDt: '2019-08-16 21:08:35',
				updId: 'SYSTEM',
				updDt: '2019-08-16 21:08:35'
			}
		}
	]
};

export default DocumentInfoTable;
