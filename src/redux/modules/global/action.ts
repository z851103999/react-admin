import * as types from "@/redux/mutation-types";

/**
 * setToken
 * @param token
 * @returns
 */
export const setToken = (token: string) => ({
	type: types.SET_TOKEN,
	token
});
