import defaultTheme from "@/styles/theme/theme-default.less";
import darkTheme from "@/styles/theme/theme-dark.less";
import { ThemeConfigProp } from "./../redux/interface/index";
/**
 * @description 全局主题设置
 * @param ThemeConfig ThemeConfigProps
 * @returns
 */
const useTheme = (ThemeConfig: ThemeConfigProp) => {
	const { isDark, weakOrGray } = ThemeConfig;
	const initTheme = () => {
		// 灰度 弱色
		const body = document.documentElement as HTMLElement;
		if (!weakOrGray) body.setAttribute("style", "");
		if (weakOrGray === "weak") body.setAttribute("style", "filter:invert(80%)");
		if (weakOrGray === "gray") body.setAttribute("style", "filter:grayscale(1)");

		// 切换黑暗模式
		let head = document.getElementsByTagName("head")[0];
		const getStyle = head.getElementsByTagName("style");
		if (getStyle.length > 0) {
			for (let i = 0, l = getStyle.length; i < l; i++) {
				if (getStyle[i]?.getAttribute("data-type") === "dark") getStyle[i].remove();
			}
		}
		let styleDom = document.createElement("style");
		styleDom.dataset.type = "dark";
		styleDom.innerHTML = isDark ? darkTheme : defaultTheme;
	};
	initTheme();
	return {
		initTheme
	};
};

export default useTheme;
