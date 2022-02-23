import React, { useState, useEffect } from "react";

import { Form, Input, Button, Checkbox, Modal, message } from "antd";
import adminService from "../../../services/shipper-service";
import shipperService from "../../../services/shipper-service";

export default function ChangePasswordShipper(props) {

    const onFinish = (values) => {
        const pass = values.password;
        const confirmPass = values.confirmPassword;
        const oldPassword = values.oldPassword;
        if (pass != confirmPass) {
            message.error("Xác nhận mật khẩu không chính xác !");
        } else if (pass.length < 6) {
            message.error("Mời nhập mật khẩu lớn hơn 6 ̉kí tự !")
        }
        else {
            localStorage.getItem("user") != null && shipperService.updatePasswordShipper(JSON.parse(localStorage.getItem("user")).id, pass, oldPassword).then(
                response => {
                    message.success("Bạn đã đổi mật khẩu thành công");
                },
                error => {
                    message.error("Bạn đã nhập mật khẩu cũ không đúng, vui lòng nhập lại !");
                }
            )
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div>

            <Form style={{ marginTop: 200, marginRight: 200 }}
                name="basic"
                labelCol={{
                    span: 8
                }}
                wrapperCol={{
                    span: 16
                }}
                initialValues={{
                    remember: true
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >


                <Form.Item
                    label="Mật khẩu cũ"
                    name="oldPassword"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mật khẩu mới!"
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu mới"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mật khẩu mới!"
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Xác nhận mật khẩu mới"
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng xác nhận mật khẩu mới !"
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Đổi mật khẩu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};