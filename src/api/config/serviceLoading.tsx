import ReactDOM from "react-dom/client";
import Loading from "@/components/Loading";

let needLoadingRequestCount = 0;
/**
 * 显示Loading
 * @param {string} tipLoading 全局Loading显示内容
 */
export const showFullScreenLoading = () => {
	if (needLoadingRequestCount === 0) {
		let dom = document.createElement("div");
		dom.setAttribute("id", "loading");
		document.body.appendChild(dom);
		ReactDOM.createRoot(dom).render(<Loading />);
	}
};
/**
 * 隐藏Loading
 * @returns
 */
export const tryHideFullScreenLoading = () => {
	if (needLoadingRequestCount <= 0) return;
	needLoadingRequestCount--;
	if (needLoadingRequestCount === 0) {
		document.body.removeChild(document.getElementById("loading") as HTMLElement);
	}
};
