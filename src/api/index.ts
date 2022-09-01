import NProgress from "@/config/nprogress";
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { showFullScreenLoading, tryHideFullScreenLoading } from "./config/serviceLoading";
import { ResultData } from "@/api/interface";
import { ResultEnum } from "@/enums/httpEnum";
import { checkStatus } from "./helper/checkStatus";
import { AxiosCanceler } from "./helper/axiosCancel";
import { setToken } from "@/redux/modules/global/action";
import { message } from "antd";
import { store } from "@/redux";

const axiosCanceler = new AxiosCanceler();

const config = {
	// 默认地址请求地址
	baseURL: import.meta.env.VITE_API_URL as string,
	// 超时时间
	timeout: 10000,
	// 跨域时候允许携带凭证
	withCredentials: true
};

class RequestHttp {
	service: AxiosInstance;
	constructor(config: AxiosRequestConfig) {
		// 实例化axios
		this.service = axios.create(config);
		/**
		 * 请求拦截器
		 */
		this.service.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				NProgress.start();
				axiosCanceler.addPending(config);
				config.headers!.noLoading || showFullScreenLoading();
				const token: string = store.getState().global.token;
				return { ...config, headers: { ...config.headers, "x-access-token": token } };
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);

		/**
		 * 响应拦截器
		 */
		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data, config } = response;
				NProgress.done();
				// 将当前请求添加到pending中
				axiosCanceler.removePending(config);
				tryHideFullScreenLoading();
				// 登陆失效 code == 599
				if (data.code == ResultEnum.OVERDUE) {
					store.dispatch(setToken(""));
					message.error(data.msg);
					window.location.hash = "/login";
					return Promise.reject(data);
				}
				// 全局错误信息拦截 !== 200
				if (data.code && data.code !== ResultEnum.SUCCESS) {
					message.error(data.msg);
					return Promise.reject(data);
				}
				// 成功请求
				return data;
			},
			async (error: AxiosError) => {
				const { response } = error;
				NProgress.done();
				tryHideFullScreenLoading();
				// 请求超时单独判断，请求超时没有response
				if (error.message.indexOf("timeout") !== -1) message.error("请求超时，请稍后重试");
				// 根据响应的错误状态吗，做不同的处理
				if (response) checkStatus(response.status);
				// 服务器结果都没有返回（可能服务器错误可能客户端断网）
				if (!window.navigator.onLine) window.location.hash = "/500";
				return Promise.reject(error);
			}
		);
	}
	/**
	 * 常用请求方法封装
	 */
	get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.get(url, { params, ..._object });
	}
	post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.post(url, params, _object);
	}
	put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.put(url, params, _object);
	}
	delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
		return this.service.delete(url, { params, ..._object });
	}
}

export default new RequestHttp(config);
