import React from "react";
import { HashRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { connect } from "react-redux";
import zhCN from "antd/es/locale/zh_CN";
import Router from "@/routers/index";
import AuthRouter from "@/routers/utils/authRouter";
import useTheme from "@/hooks/useTheme";

const App: React.FC = (props: any) => {
	const { themeConfig } = props;

	// 全局使用主题
	useTheme(themeConfig);

	return (
		<HashRouter>
			<ConfigProvider locale={zhCN}>
				<AuthRouter>
					<Router />
				</AuthRouter>
			</ConfigProvider>
		</HashRouter>
	);
};

const mapStateToProps = (state: any) => state.global;
export default connect(mapStateToProps, null)(App);
