import ReactDOM from "react-dom/client";
import App from "@/App";
import "antd/dist/antd.css";
import { store, persistor } from "@/redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
);
