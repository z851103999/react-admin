import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Login } from "@/api/interface";
import md5 from "md5";
import { loginApi } from "@/api/modules/login";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setToken } from "@/redux/modules/global/action";
import { setTabsList } from "@/redux/modules/tabs/actions";

const LoginForm: React.FC = (props: any) => {
	const [form] = Form.useForm();
	const { setToken, setTabsList } = props;
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);

	/**
	 * 登陆
	 * @param loginForm
	 */
	const onFinish = async (loginForm: Login.ReqLoginForm) => {
		try {
			setLoading(true);
			loginForm.password = md5(loginForm.password);
			const { data } = await loginApi(loginForm);
			setToken(data?.access_token);
			setTabsList([]);
			message.success("登陆成功");
			navigate(HOME_URL);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed", errorInfo);
	};

	return (
		<Form
			form={form}
			name="basic"
			labelCol={{ span: 5 }}
			initialValues={{ remember: true }}
			size={"large"}
			autoCapitalize={"off"}
			onFinish={onFinish}
			autoComplete="off"
			onFinishFailed={onFinishFailed}
		>
			<Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
				<Input placeholder="用户名：admin / user" prefix={<UserOutlined />} />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
				<Input.Password autoComplete={"new-password"} placeholder="密码 123456" prefix={<LockOutlined />} />
			</Form.Item>
			<Form.Item className="login-btn">
				<Button
					icon={<CloseCircleOutlined />}
					onClick={() => {
						form.resetFields();
					}}
				>
					重启
				</Button>
				<Button type="primary" htmlType="submit" icon={<UserOutlined />} loading={loading}>
					提交
				</Button>
			</Form.Item>
		</Form>
	);
};

const mapDispatchToProps = { setToken, setTabsList };
export default connect(null, mapDispatchToProps)(LoginForm);
