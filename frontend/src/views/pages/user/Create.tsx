/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import React from 'react';
import "./style.scss";


const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const Create = () => {
  return (
    <Row id='create-user' gutter={16}>
      <Col span={24}>
        <Card title="Tạo người dùng" bordered={true}>
          <Form
            id="create-form"
            name="create-user"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >

            <Row>
              <Col span={12}>
                <Form.Item
                  label="Họ tên"
                  name="fullname"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>

                <Form.Item
                  label="CCCD/CMND"
                  name="cccd"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>

                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>


              <Col span={12} style={{ justifyContent: 'center' }}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>

                <Form.Item
                  label="Phòng ban"
                  name="type"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Select
                    defaultValue="Nhân viên phòng marketing"
                    onChange={handleChange}
                    options={[
                      { value: 'Nhân viên phòng sale', label: 'Nhân viên phòng sale' },
                      { value: 'Nhân viên phòng sale', label: 'Nhân viên phòng sale' },
                      { value: 'disabled', label: 'Disabled', disabled: true },
                    ]}
                  />
                </Form.Item>

              </Col>

              <Col span={24}>

                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>

                <Form.Item className="btn-submit" wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Tạo người dùng
                  </Button>
                </Form.Item>

              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}



export default Create
