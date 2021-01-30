import React from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {connect} from "react-redux";
import {setUserInfo, UserState} from "../../../store/module/user";
import {IStoreState} from "../../../store/types";
import {apiLogin, LoginData} from "../../../api/user";
import {RouteComponentProps} from "react-router-dom";


const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};
const tailLayout = {
  wrapperCol: {offset: 8, span: 16},
};

interface LoginProps extends RouteComponentProps {
  token: string;
  setUserInfo: (user: UserState) => void;
}

const Login: React.FC<LoginProps> = (props) => {
  const {setUserInfo} = props;

  const next = () => {
    setTimeout(() => {
      const params = new URLSearchParams(props.history.location.search);
      const redirect = params.get('redirect');
      props.history.push(redirect || '/');
    }, 10);
  };

  const onFinish = (loginData: LoginData) => {
    // 登录
    apiLogin(loginData).then(res => {
      setUserInfo(res.data);
      next();
    }).catch(error => console.log(error));
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

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default connect(({user}: IStoreState) => ({token: user.token}), {setUserInfo})(Login);
