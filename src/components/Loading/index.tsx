import { Spin } from "antd";
import "./index.less";

/**
 * Loading
 * @param {string} tip 提示文字
 */
const Loading = ({ tip = "Loading" }: { tip?: string }) => {
	return <Spin tip={tip} size="large" className="request-loading" />;
};

export default Loading;
