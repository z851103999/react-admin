import { PORT1 } from "./../config/servicePort";
import { Login } from "./../interface/index";
import qs from "qs";

import http from "@/api";

/**
 * 用户登陆接口
 * @param params
 * @returns
 */
export const loginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>(PORT1 + `/login`, params);
	return http.post<Login.ResLogin>(PORT1 + `/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	return http.post<Login.ResLogin>(PORT1 + `/login`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	return http.post<Login.ResLogin>(PORT1 + `/login`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};
/**
 * 获取按钮权限
 * @returns
 */
export const getAuthorButtons = () => {
	return http.get<Login.ResAuthButtons>(PORT1 + `/auth/buttons`);
};
