import { connect } from "react-redux";
import "./index.less";

const LayoutFooter = () => {
	return (
		<>
			<div className="footer">
				<a href="https://github.com/z851103999/react-admin" target="_blank" rel="noreferrer">
					react-admin
				</a>
			</div>
		</>
	);
};

const mapStateToProps = (state: any) => state.global;
export default connect(mapStateToProps)(LayoutFooter);
