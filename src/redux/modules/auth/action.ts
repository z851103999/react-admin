import * as types from "@/redux/mutation-types";

/**
 * 权限按钮
 * @param authButtons
 */
export const setAuthButtons = (authButtons: { [propName: string]: any }) => ({
	type: types.SET_AUTH_BUTTONS,
	authButtons
});
/**
 * 权限路由
 * @param authRouter
 */
export const setAuthRouter = (authRouter: string[]) => ({
	type: types.SET_AUTH_ROUTER,
	authRouter
});
