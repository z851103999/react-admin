import axios, { AxiosRequestConfig, Canceler } from "axios";
import qs from "qs";
import { isFunction } from "lodash";

let pendingMap = new Map<string, Canceler>();
/**
 * 序列化参数
 * @param config AxiosRequestConfig
 */
export const getPendingUrl = (config: AxiosRequestConfig) =>
	[config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join("&");

export class AxiosCanceler {
	/**
	 * 添加请求
	 * @param config
	 */
	addPending(config: AxiosRequestConfig) {
		// 在请求开始前，对之前的请求做检查取消操作
		this.removePending(config);
		const url = getPendingUrl(config);
		config.cancelToken =
			config.cancelToken ||
			new axios.CancelToken(cancel => {
				if (!pendingMap.has(url)) {
					// 如果pending中不存在当前请求，则添加进去
					pendingMap.set(url, cancel);
				}
			});
	}
	/**
	 * 移除操作
	 * @param config
	 */
	removePending(config: AxiosRequestConfig) {
		const url = getPendingUrl(config);

		if (pendingMap.has(url)) {
			// 如果在pending 中存在当前请求标志，需要取消当前请求，并且移除
			const cancel = pendingMap.get(url);
			cancel && cancel();
			pendingMap.delete(url);
		}
	}
	/**
	 * 	清空所有pending
	 */
	removeAllPending() {
		pendingMap.forEach(cancel => {
			cancel && isFunction(cancel) && cancel();
		});
		pendingMap.clear();
	}
	/**
	 * 重制
	 */
	reset(): void {
		pendingMap = new Map<string, Canceler>();
	}
}
