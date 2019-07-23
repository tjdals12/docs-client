import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { LayoutRoute, MainLayout } from 'components/Layout';
import { DashboardPage } from 'pages';

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<LayoutRoute exact path="/" layout={MainLayout} component={DashboardPage} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
