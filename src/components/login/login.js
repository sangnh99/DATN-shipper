import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import "./login.css";

export default function Login(props) {
    const [form] = Form.useForm();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const onFinish = (values) => {
        AuthService.login(values.username, values.password).then(
            (response) => {
              if (response.roles[0].authority != "ROLE_SHIPPER"){
                message.error("Bạn đã nhập sai tên hoặc mật khẩu, vui lòng nhập lại !");
              } else {
            console.log(response);
              localStorage.setItem("user", JSON.stringify(response));
              message.success("Bạn đã đăng nhập thành công !");
              setTimeout(() => {
                history.push("/shipper");
                window.location.reload();
              }, 1500);
            }
            },
            error => {
                message.error("Bạn đã nhập sai tên hoặc mật khẩu, vui lòng nhập lại !");
            }
          );
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <section>
            <div class="form-container">
                <h1>Đăng nhập</h1>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"

                    form={form}
                >
                    <Form.Item
                        label={<span style={{color : "white"}}>Tên đăng nhập</span>}
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên đăng nhập !",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{color : "white"}}>Mật khẩu</span>}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu !',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}