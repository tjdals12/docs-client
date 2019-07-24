import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { LayoutRoute, MainLayout } from 'components/Layout';
import { DashboardPage, DocumentsPage } from 'pages';

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<LayoutRoute exact path="/" layout={MainLayout} component={DashboardPage} />
					<LayoutRoute exact path="/documents" layout={MainLayout} component={DocumentsPage} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
