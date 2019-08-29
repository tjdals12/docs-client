import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { LayoutRoute, MainLayout } from 'components/Layout';
import {
	DashboardPage,
	DocumentsPage,
	VendorsPage,
	IndexesOverallPage,
	IndexesDetailPage,
	IndexesInfosPage,
	TransmittalsPage
} from 'pages';

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<LayoutRoute exact path="/" layout={MainLayout} component={DashboardPage} />
					<LayoutRoute exact path="/documents" layout={MainLayout} component={DocumentsPage} />
					<LayoutRoute exact path="/vendors" layout={MainLayout} component={VendorsPage} />
					<LayoutRoute exact path="/indexes/overall" layout={MainLayout} component={IndexesOverallPage} />
					<LayoutRoute exact path="/indexes/detail" layout={MainLayout} component={IndexesDetailPage} />
					<LayoutRoute exact path="/indexes/infos" layout={MainLayout} component={IndexesInfosPage} />
					<LayoutRoute exact path="/transmittals/overall" layout={MainLayout} component={TransmittalsPage} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
