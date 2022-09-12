export interface GlobalState {
	token: string;
}

export interface MenuState {
	isCollapse: boolean;
	menuList: Menu.MenuOptions[];
}

export interface TabsState {
	tabsActive: string;
	tabsList: Menu.MenuOptions[];
}

export interface BreadcrumbState {
	breadcrumbList: {
		[propName: string]: any;
	};
}

export interface AuthState {
	authButtons: {
		[pathName: string]: any;
	};
	authRouter: string[];
}
