import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink as BSNavLink, Collapse } from 'reactstrap';
import { MdDashboard, MdDescription, MdBusiness, MdKeyboardArrowDown, MdChevronRight } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';
import bn from 'utils/bemnames';
import sidebarBgImg from 'assets/img/sidebar/sidebar-9.jpg';

const bem = bn.create('sidebar');

const sidebarBackground = {
	background: `url("${sidebarBgImg}")`,
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat'
};

const navMenus = [
	{ to: '/', name: 'Dashboard', exact: true, Icon: MdDashboard },
	{ to: '/documents', name: 'Documents', exact: true, Icon: MdDescription },
	{ to: '/vendors', name: 'Vendors', exact: true, Icon: MdBusiness }
];

const vendorMenus = [
	{ to: '/vendors/overral', name: 'Overral', exact: true, Icon: MdChevronRight },
	{ to: '/vendors/list', name: 'Vendor List', exact: true, Icon: MdChevronRight },
	{ to: '/vendors/management', name: 'Management', exact: true, Icon: MdChevronRight }
];

class Sidebar extends React.Component {
	state = {
		isOpenVendors: true
	};

	handleClick = (name) => () => {
		this.setState((prevState) => {
			let isOpen = prevState[`isOpen${name}`];

			return {
				[`isOpen${name}`]: !isOpen
			};
		});
	};

	render() {
		return (
			<aside className={bem.b()} data-image={sidebarBgImg}>
				<div className={bem.e('background')} style={sidebarBackground} />
				<div className={bem.e('content')}>
					<Navbar>
						<NavbarBrand>
							<span>
								Minz-logger <FaGithub />
							</span>
						</NavbarBrand>
					</Navbar>
					<Nav vertical>
						{navMenus.map(({ to, name, exact, Icon }, index) => (
							<NavItem key={index} className={bem.e('nav-item')}>
								<BSNavLink
									id={`navItem-${name}-${index}`}
									className="text-uppercase"
									activeClassName="active"
									to={to}
									exact={exact}
									tag={NavLink}
								>
									<Icon className={bem.e('nav-item-icon')} />
									<span className="text-white">{name}</span>
								</BSNavLink>
							</NavItem>
						))}

						<NavItem className={bem.e('nav-item')}>
							<BSNavLink className={bem.e('nav-collapse')} onClick={this.handleClick('Vendors')}>
								<div className="d-flex">
									<MdBusiness className={bem.e('nav-item-icon')} />
									<span>VENDORS</span>
								</div>
								<MdKeyboardArrowDown
									className={bem.e('nav-item-icon')}
									style={{
										padding: 0,
										transform: this.state.isOpenVendors ? 'rotate(0deg)' : 'rotate(-90deg)',
										transitionProperty: 'transform',
										transitionDuration: '.2s'
									}}
								/>
							</BSNavLink>
						</NavItem>
						<Collapse isOpen={this.state.isOpenVendors} className="pl-2">
							{vendorMenus.map(({ to, name, exact, Icon }, index) => (
								<NavItem key={index} className={bem.e('nav-item')}>
									<BSNavLink
										id={`navItem-${name}-${index}`}
										className="text-uppercase"
										activeClassName="active"
										to={to}
										exact={exact}
										tag={NavLink}
									>
										<Icon className={bem.e('nav-item-icon')} />
										<span className="text-white">{name}</span>
									</BSNavLink>
								</NavItem>
							))}
						</Collapse>
					</Nav>
				</div>
			</aside>
		);
	}
}

export default Sidebar;
