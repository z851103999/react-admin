import * as types from "@/redux/mutation-types";

/**
 * updateCollapse
 * @param isCollapse
 */
export const updateCollapse = (isCollapse: boolean) => ({
	type: types.UPDATE_COLLAPSE,
	isCollapse
});
/**
 * setMenuList
 * @param menuList
 */
export const setMenuList = (menuList: Menu.MenuOptions[] | undefined) => ({
	type: types.SET_MENU_LIST,
	menuList
});
