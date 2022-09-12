// vite
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
	VITE_API_URL: string;
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_GLOB_APP_TITLE: string;
	VITE_DROP_CONSOLE: boolean;
	VITE_PROXY_URL: string;
	VITE_BUILD_GZIP: boolean;
	VITE_REPORT: boolean;
}

/**
 * menu
 */
declare namespace Menu {
	interface MenuOptions {
		path: string;
		title: string;
		icon?: string;
		isLink?: string;
		children?: MenuOptions[];
	}
}

/**
 * Dropdown MenuInfo
 */
declare interface MenuInfo {
	key: string;
	keyPath: string[];
	item: React.ReactInstance;
	domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}
