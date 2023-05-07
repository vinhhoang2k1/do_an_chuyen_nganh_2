/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button, Card, Col, Form, Input, Row, Select
} from 'antd';

import { setCredentials } from '@apps/slices/authSlice'
import { saveAccessToken } from '@utils/localStorage'
import { useAppDispatch } from '@apps/hooks'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import "./style.scss";
import { useRegisterMutation } from '@apps/services/loginApi';
const RegisterPage = () => {
  const [Register] = useRegisterMutation();
  const appDispatch = useAppDispatch()
  const navigate = useNavigate()

  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}T${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;

  const onFinish = async (values: any) => {
    const payload = {
      ...values,
      createdAt: formattedDate,
      updatedAt: formattedDate,
    };
    try {
      const response = await Register(payload).unwrap();
      console.log('response:', response)
      if ('error' in response) {
        // handle error here
        console.error(response.error);
        return;
      }
      const token: string = response.accessToken;
      appDispatch(
        setCredentials({
          user: {
            email: values.email,
            password: values.password
          },
          access_token: token,
        }),
      )

      saveAccessToken(token)

    } catch (err) {
      console.error(err)
      // Xử lý lỗi
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // const handleChange = (value: string) => {
  //   console.log(`selected ${value}`);
  // };

  return (
    <Row id='login-page' gutter={16} justify="center" className="w-100 mb-90">
      <Col span={10}>
        <Card title="Register" bordered={true}>
          <Form
            id="create-form"
            name="create-user"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >

            <Row>
              <Col span={24}>
                <Form.Item
                  label="Họ tên"
                  name="fullName"
                  rules={[{ required: true, message: 'Please input your fullName!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>

                <Form.Item
                  label="CCCD/CMND"
                  name="cccdNumber"
                  rules={[{ required: true, message: 'Please input your CCCD/CMND!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>


              <Col span={24} style={{ justifyContent: 'center' }}>
                <Form.Item
                  label="Số điện thoại"
                  name="phoneNumber"
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Phòng ban"
                  name="department"
                  rules={[{ required: true, message: 'Please input your department!' }]}
                >
                  <Select
                    // defaultValue="Nhân viên phòng marketing"
                    // onChange={handleChange}
                    options={[
                      { value: 'Nhân viên phòng sale', label: 'Nhân viên phòng sale' },
                      { value: 'Nhân viên phòng marketing', label: 'Nhân viên phòng  marketing' },
                      // { value: 'disabled', label: 'Disabled', disabled: true },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[{ required: true, message: 'Please input your address!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>


              <Col span={24}>
                <Form.Item className="btn-submit" wrapperCol={{ offset: 10, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item className="btn-submit" wrapperCol={{ offset: 8, span: 16 }}>
                  <p>Đã có tài khoản? 
                    <a onClick={() => { navigate('/login') }}> Đăng nhập</a>
                  </p>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default RegisterPage
