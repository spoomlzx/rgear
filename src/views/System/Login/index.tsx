import React from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {connect} from "react-redux";
import {setUserToken, login} from "../../../store/module/user";
import {IStoreState} from "../../../store/types";
import {apiLogin, LoginData} from "../../../api/login";


const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};
const tailLayout = {
  wrapperCol: {offset: 8, span: 16},
};

interface LoginProps {
  token: string;
  setUserToken: (token: string) => void;
  login: (data: LoginData) => void;
}

const Login: React.FC<LoginProps> = (props) => {
  const {setUserToken} = props;

  const onFinish = async (values: any) => {
    try {
      // 登录
      const res = await apiLogin(values);
      setUserToken(res.data)
      console.log(res)
    } catch (error) {

    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{remember: true}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{required: true, message: 'Please input your username!'}]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{required: true, message: 'Please input your password!'}]}
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      {props.token}
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default connect(({user}: IStoreState) => ({token: user.token}), {setUserToken, login})(Login);
