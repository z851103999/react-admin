import React from "react";
import { Spin } from "antd";
import { Suspense } from "react";

const lazyLoad = (Comp: React.LazyExoticComponent<any>): React.ReactNode => {
	return (
		<Suspense
			fallback={<Spin size="large" style={{ display: "flex", alignItem: "center", justifyContent: "center", height: "100%" }} />}
		>
			<Comp />
		</Suspense>
	);
};

export default lazyLoad;
