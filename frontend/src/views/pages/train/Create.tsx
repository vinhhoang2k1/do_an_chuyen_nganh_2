/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Card, Col, Form, Input, Row, Select } from 'antd'
// import { useNavigate } from 'react-router-dom'

import React from 'react'
import { useCreatetrainMutation } from '@apps/services/trainApi'
import './style.scss'
const Create = () => {
  // const navigate = useNavigate()
  const [createTrain] = useCreatetrainMutation();
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}T${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;
  const onFinish = async (values: any) => {
    const payload = {
      ...values,
      createdAt: formattedDate,
      updatedAt: formattedDate,
    };
    try {

      await createTrain(payload).unwrap()
      // Xóa thành công
    } catch (err) {
      console.error(err)
      // Xử lý lỗi
    }
    console.log('Success', payload)
   
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Card id="create-train" title="Tạo mới tàu" bordered={true}>
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
              label="Số hiệu tàu"
              name="trainNumber"
              rules={[
                { required: true, message: 'Please input train number!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Số ghế"
              name="seatsNumber"
              rules={[
                { required: true, message: 'Please input seat number!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Trạng thái"
              name="status"
              rules={[
                { required: true, message: 'Please select status!' },
              ]}
            >
              <Select
                options={[
                  {
                    value: 1,
                    label: 'Hoạt động',
                  },
                  {
                    value: 0,
                    label: 'Tạm ngưng',
                  },

                ]}
              />
            </Form.Item>
          </Col>
          {/* <Col span={12}>
            <Form.Item
              label="Ngày tạo"
              name="createdAt"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col> */}

          {/* <Col span={12}>
            <Form.Item
              label="Ngày sửa"
              name="updatedAt"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col> */}

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
