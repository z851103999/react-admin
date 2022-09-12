import { Tabs } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setTabsList } from "@/redux/modules/tabs/actions";
import { routerArray } from "@/routers";
import { searchRoute } from "@/utils/utils";
// import MoreButton from "./components/MoreButton";
import "./index.less";

const LayoutTabs = (props: any) => {
	const { tabsList } = props.tabs;
	const { setTabsList } = props;
	const { TabPane } = Tabs;
	const { pathname } = useLocation();
	const [activeValue, setActiveValue] = useState<string>(pathname);

	const navigate = useNavigate();

	useEffect(() => {
		addTabs();
	}, [pathname]);

	// click tabs
	const clickTabs = (path: string) => {
		navigate(path);
	};

	const addTabs = () => {
		const route = searchRoute(pathname, routerArray);
		let newTabsList = JSON.parse(JSON.stringify(tabsList));
		if (tabsList.every((item: any) => item.path !== route.path)) {
			newTabsList.push({ title: route.meta!.title, path: route.path });
		}
		setTabsList(newTabsList);
		setActiveValue(pathname);
	};

	const delTabs = (tabPath?: string) => {
		if (tabPath === HOME_URL) return;
		if (pathname === tabPath) {
			tabsList.forEach((item: Menu.MenuOptions, index: number) => {
				if (item.path !== pathname) return;
				const nextTab = tabsList[index + 1] || tabsList[index - 1];
				if (!nextTab) return;
				navigate(nextTab.path);
			});
			setTabsList(tabsList.filter((item: Menu.MenuOptions) => item.path !== tabPath));
		}
	};

	return (
		<>
			<div className="tabs">
				<Tabs
					animated
					activeKey={activeValue}
					onChange={clickTabs}
					hideAdd
					type="editable-card"
					onEdit={path => {
						delTabs(path as string);
					}}
				>
					{tabsList.map((item: Menu.MenuOptions) => {
						return (
							<TabPane
								key={item.path}
								tab={
									<span>
										{item.path == HOME_URL ? <HomeFilled /> : ""}
										{item.title}
									</span>
								}
								closable={item.path !== HOME_URL}
							></TabPane>
						);
					})}
				</Tabs>
			</div>
		</>
	);
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = { setTabsList };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutTabs);
