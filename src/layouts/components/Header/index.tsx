import React from "react";
import { Layout } from "antd";
import CollapseIcon from "./components/CollapseIcon";
import BreadcrumbNav from "./components/BreadcrumbNav";
import Fullscreen from "./components/Fullscreen";

import "./index.less";
import Theme from "./components/Theme";
import AvatarIcon from "@/layouts/components/Header/components/AvatarIcon";

const LayoutHeader: React.FC = () => {
	const { Header } = Layout;

	return (
		<Header>
			<div className="header-lf">
				<CollapseIcon />
				<BreadcrumbNav />
			</div>
			<div className="header-ri">
				<Fullscreen />
				<Theme />
				<span className="username">admin</span>
				<AvatarIcon />
			</div>
		</Header>
	);
};

export default LayoutHeader;
