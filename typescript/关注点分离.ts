/**********************************************************************
 *
 * @模块名称: AssignAssetsToUsers
 *
 * @模块作用: 添加用户的资产信息
 *
 * @创建人: ligm12
 *
 * @date: 2021/6/28 20:42
 *
 * @版权所有: SANY ⋅ 重工 ⋅ 智能研究总院
 *
 **********************************************************************/
import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';
import {Form, Button, Modal, message} from 'antd';
import {UserOutlined, LockOutlined, CameraOutlined} from '@ant-design/icons';
import DeviceGroupNameSelect from "@views/Home/equipmentM/deviceGroup/DeviceGroupNameSelect";
import {queryUserDeviceAuth, userAddDeviceAuth} from "@api/user";

/**
 * form表单需要参数
 */
type FormProps = {
	onFinish?: (v: any) => any,
	userAuth: any[]
}
/**
 * ref类型
 */
type RefProps = {
	current: any
}

type Response = {
	code: number,
	data: any,
	msg: string
}
/**
 * 检查成功失败状态
 * @param res
 */
const curryCheckCode = (fn: () => boolean) => {
	if (fn()) return message.success;
	return message.error
};

export const AssignAssetsToUsersForm = forwardRef((props: FormProps, formRef) => {
	const form: any = useRef<RefProps>(null);
	/**
	 * 注入getValue钩子
	 */
	useImperativeHandle(formRef, () => ({
		getValue: async () => {
			return form.current.validateFields();
		}
	}));
	
	return (
		<React.Fragment>
			<Form
				ref = {form}
	name = "normal_login"
	className = "login-form"
	initialValues = {
	{
		typeName: props.userAuth
	}
}
>
	<Form.Item
		label = "设备标签"
	name = {["typeName"]}
	valuePropName = {`value`
}
	rules = {[{required: true, message: '请选择设备标签!'}]}
	>
	<DeviceGroupNameSelect form = {form}
	defaultValue = {props.userAuth}
	/>
	< /Form.Item>
	< /Form>
	< /React.Fragment>
)
});


type UsersProps = {
	rows: {
		username: string
	},
	tableRef?: RefProps,
}

const AssignAssetsToUsersButton = (props: UsersProps) => {
	/**
	 * 能力传递
	 */
	const {rows} = props;
	/**
	 * 显示隐藏
	 */
	const [isVisible, setVisible] = useState<boolean>(false);
	/**
	 * 用户权限
	 */
	const [userAuth, setUserAuth] = useState<any[]>([]);
	/**
	 * form表单对象
	 */
	const formRef: any = useRef<RefProps>();
	/**
	 * 打开
	 */
	const showModal = () => {
		queryUserDeviceAuth(rows?.username).then((res: any) => {
			setUserAuth(res?.data);
			setVisible(true);
		});
	};
	/**
	 * 确定
	 */
	const handleOk = () => {
		formRef.current.getValue().then((value: any) => {
			userAddDeviceAuth(rows?.username, value?.typeName).then((res: any) => {
				curryCheckCode(() => {
					return res.code === 200;
				})(res.msg)
			});
			setVisible(false);
		});
	};
	/**
	 * 关闭
	 */
	const handleCancel = () => {
		setVisible(false);
	};
	
	return (
		<React.Fragment>
			<Button type = "primary"
	icon = { < CameraOutlined / >
}
	onClick = {showModal} > </Button>
		< Modal
	title = {rows?.username
}
	visible = {isVisible}
	onOk = {handleOk}
	onCancel = {handleCancel} >
	<AssignAssetsToUsersForm ref = {formRef}
	userAuth = {userAuth}
	/>
	< /Modal>
	< /React.Fragment>
)
};

export default AssignAssetsToUsersButton;