import React, { useState } from 'react'
import './Sidebar.scss';
import { withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { PieChartOutlined } from '@ant-design/icons'
import { SiGoogleclassroom } from 'react-icons/si';
const { Sider } = Layout;

const navLinkGroups = [
	{
		name: 'Dashboard',
		key: 'DASHBOARD',
		icon: <PieChartOutlined />,
		route: '/',
	},
	{
		name: 'Classes',
		key: 'CLASSES',
		icon: <span class="anticon "><SiGoogleclassroom /></span>,
		route: '/classes',
	},
	{
		name: 'Subjects',
		key: 'SUBJECTS',
		icon: <span class="anticon "><SiGoogleclassroom /></span>,
		route: '/subjects',
	},
	{
		name: 'Exam Papers',
		key: 'EXAM_PAPERS',
		icon: <span class="anticon "><SiGoogleclassroom /></span>,
		route: '/examPapers',
	},
	{
		name: 'Videos',
		key: 'VIDEOS',
		icon: <span class="anticon "><SiGoogleclassroom /></span>,
		route: '/vidoes',
	},
];

function Sidebar(props) {
	const [selectedMenu, setSelectedMenu] = useState("DASHBOARD");
	const [sider, setSider] = useState("DASHBOARD");

	function _onLinkClick({ key }) {
		const item = navLinkGroups.find(item => item.key === key)
		setSelectedMenu(item.key);
		props.history.push(item.route)
	}

	const onCollapse = collapsed => {
		setSider(collapsed);
	};

	return (
		<Sider className="Sidebar" theme="dark" collapsible collapsed={sider} onCollapse={onCollapse}>
			<Menu className="Sidebar__menu" theme="dark" selectedKeys={[selectedMenu]} mode="inline" onSelect={_onLinkClick}>
				{navLinkGroups.map((nav => <Menu.Item key={nav.key} icon={nav.icon}>{nav.name}</Menu.Item>))}
			</Menu>
		</Sider>
	)
}

export default withRouter(Sidebar)
