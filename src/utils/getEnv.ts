import fs from "fs";
import path from "path";
import dotenv from "dotenv";

export function isDevFn(mode: string): boolean {
	return mode === "development";
}

export function isProdFn(mode: string): boolean {
	return mode === "production";
}

/**
 * 读取所有环境变量配置 process.env
 */
export function wrapperEnv(envConfig: Recordable): ViteEnv {
	const ret: any = {};
	for (const envName of Object.keys(envConfig)) {
		let realName = envConfig[envName].replace(/\\n/g, "\n");
		realName = realName === "true" ? true : realName === "false" ? false : realName;

		if (envName === "VITE_PORT") {
			realName = Number(realName);
		}

		if (envName === "VITE_PROXY") {
			try {
				realName = JSON.parse(realName);
			} catch (error) {
				console.log(error);
			}
		}

		ret[envName] = realName;
		process.env[envName] = realName;
	}
	return ret;
}

/**
 * 获取以指定前缀开头的环境变量
 * @param match
 * @param configFiles
 */
export function getEnvConfig(match = "VITE_GLOB_", configFiles = [".env", ".env.development"]) {
	let envConfig = {};
	configFiles.forEach(item => {
		try {
			const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)));
			envConfig = { ...envConfig, ...env };
		} catch (error) {
			console.log(`Error in parsing ${item}`, error);
		}
	});
	Object.keys(envConfig).forEach(key => {
		const reg = new RegExp(`^(${match})`);
		if (!reg.test(key)) {
			Reflect.deleteProperty(envConfig, key);
		}
	});
	return envConfig;
}

/**
 * 获取用户的根目录
 * @param dir
 */
export function getRootPath(...dir: string[]) {
	return path.resolve(process.cwd(), ...dir);
}
