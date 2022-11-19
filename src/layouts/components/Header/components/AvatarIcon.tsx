import { useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import { Modal, message, Dropdown, Avatar } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { HOME_URL } from "@/config/config";
import { setToken } from "@/redux/modules/global/action";
import { connect } from "react-redux";
import avatar from "@/assets/images/logo.png";

const AvatarIcon: React.FC = (props: any) => {
	const { setToken } = props;
	const navigate = useNavigate();

	interface ModalProps {
		showModal: (params: { name: number }) => void;
	}

	const passRef = useRef<ModalProps>(null);
	const infoRef = useRef<ModalProps>(null);

	// 退出登录
	const logout = () => {
		Modal.confirm({
			title: "温馨提示 🧡",
			icon: <ExclamationCircleOutlined />,
			content: "是否确认退出登录？",
			okText: "确认",
			cancelText: "取消",
			onOk: () => {
				setToken("");
				message.success("退出登录成功！");
				navigate("/login");
			}
		});
	};

	const items = [
		{
			key: "1",
			label: <span className="dropdown-item">首页</span>,
			onClick: () => navigate(HOME_URL)
		},
		{
			key: "2",
			label: <span className="dropdown-item">个人信息</span>,
			onClick: () => infoRef.current!.showModal({ name: 11 })
		},
		{
			key: "3",
			label: <span className="dropdown-item">修改密码</span>,
			onClick: () => passRef.current!.showModal({ name: 11 })
		},
		{
			type: "divider"
		},
		{
			key: "4",
			label: <span className="dropdown-item">退出登录</span>,
			onClick: logout
		}
	];

	return (
		<>
			<Dropdown menu={{ items }} placement="bottom" arrow trigger={["click"]}>
				<Avatar size="large" src={avatar} />
			</Dropdown>
		</>
	);
};

const mapDispatchToProps = { setToken };
export default connect(null, mapDispatchToProps)(AvatarIcon);
