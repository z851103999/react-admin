import { Spin } from "antd";
import "./index.less";

/**
 * Loading
 * @param param0
 * @returns
 * @param tip 当作为包裹元素时，可以自定义描述文案
 */
const Loading = ({ tip = "Loading" }: { tip?: string }) => {
	return <Spin tip={tip} size="large" className="request-loading" />;
};

export default Loading;
