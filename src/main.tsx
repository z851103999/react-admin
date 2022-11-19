import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { store, persistor } from "@/redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "virtual:svg-icons-register";

import "antd/dist/antd.css";
import "@/styles/reset.less";
import "@/assets/iconfont/iconfont.less";
import "@/assets/fonts/font.less";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
