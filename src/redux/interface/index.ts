export interface GlobalState {
	token: string;
	themeConfig: ThemeConfigProp;
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

export interface ThemeConfigProp {
	primary: string;
	isDark: boolean;
	// 灰色或色弱
	weakOrGray: string;
	// 面包屑
	breadcrumb: boolean;
	tabs: boolean;
	footer: boolean;
}
