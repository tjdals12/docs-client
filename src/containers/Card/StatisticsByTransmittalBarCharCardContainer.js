import React from 'react';
import BarChartCard from 'components/Card/BarChartCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as transmittalActions from 'store/modules/transmittal';

class StatisticsByTransmittalBarChartCardContainer extends React.Component {
	getStatisticsByTransmittal = () => {
		const { TransmittalActions, vendor } = this.props;

		TransmittalActions.statisticsByTransmittal({ vendor });
	};

	componentDidMount() {
		this.getStatisticsByTransmittal();
	}

	render() {
		const { statisticsByTransmittal } = this.props;

		if (!statisticsByTransmittal) return null;

		return <BarChartCard data={statisticsByTransmittal} title="Transmittal Receive / Reply" />;
	}
}

export default connect(
	(state) => ({
		statisticsByTransmittal: state.transmittal.get('statisticsByTransmittal')
	}),
	(dispatch) => ({
		TransmittalActions: bindActionCreators(transmittalActions, dispatch)
	})
)(StatisticsByTransmittalBarChartCardContainer);
