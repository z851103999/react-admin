/**
 * 请求响应 不含数据
 */
export interface Result {
	code: string;
	msg: string;
}

/**
 * 请求响应参数(包含data)
 */
export interface ResultData<T> extends Result {
	data?: T;
}

/**
 * 分页响应数据
 */
export interface ResPage<T> {
	datalist: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

/**
 * 分页请求参数
 */
export interface ReqPage {
	pageNum: number;
	pageSize: number;
}

/**
 * 登陆
 */
export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
	}
	export interface ResLogin {
		access_token: string;
	}
	export interface ResAuthButtons {
		[propName: string]: any;
	}
}
