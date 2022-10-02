import React, { useEffect, useState } from "react";
import screenfull from "screenfull";
// import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import { message } from "antd";

// https://github.com/sindresorhus/screenfull

/**
 * @description 全屏组件
 */
const Fullscreen: React.FC = () => {
	const [fullScreen, setFullScreen] = useState<boolean>(screenfull.isFullscreen);

	useEffect(() => {
		// 添加一个侦听器，用于浏览器何时进入和切换出全屏或出现错误。
		screenfull.on("change", () => {
			if (screenfull.isFullscreen) setFullScreen(true);
			else setFullScreen(false);
			// 关闭监听器
			return () => screenfull.off("change", () => {});
		});
	}, []);

	/**
	 * @description 是否允许您进入全屏。
	 */
	const handleFullScreen = () => {
		if (!screenfull.isEnabled) message.warning("当前您的浏览器不支持全屏");
		// 如果非活动状态，则请求全屏，否则退出。
		screenfull.toggle();
	};

	return (
		<i className={["icon-style iconfont", fullScreen ? "icon-suoxiao" : "icon-fangda"].join(" ")} onClick={handleFullScreen}></i>
	);
};
export default Fullscreen;
