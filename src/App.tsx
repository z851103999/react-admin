import { ConfigProvider } from "antd";
import { HashRouter } from "react-router-dom";
import React from "react";
import zhCN from "antd/es/locale/zh_CN";
import Router from "@/routers/index";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import AuthRouter from "@/routers/utils/authRouter";
// import AuthRouter from "@/routers/utils/authRouter";

const App: React.FC = () => {
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
