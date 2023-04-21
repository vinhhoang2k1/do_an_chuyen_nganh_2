/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Card, Col, Form, Input, Row, Select } from 'antd'
import React from 'react'
import './style.scss'
const Create = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Card id="create-station" title="Tạo mới nhà ga" bordered={true}>
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
              label="Tên nhà ga"
              name="stationName"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Địa chỉ ga"
              name="placeStation"
              rules={[
                { required: true, message: 'Please input your placeStation!' },
              ]}
            >
              <Select
                defaultValue="1"
                options={[
                  {
                    value: '1',
                    label: 'Hà Nội',
                  },
                  {
                    value: '2',
                    label: 'Hồ Chí Minh',
                  },
                ]}
              />
            </Form.Item>
          </Col>
      
          <Col span={12}>
            <Form.Item
              className="btn-submit"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Button type="primary" htmlType="submit">
                Xác nhận
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default Create
