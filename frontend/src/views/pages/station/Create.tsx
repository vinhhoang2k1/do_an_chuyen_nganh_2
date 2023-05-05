/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Card, Col, Form, Input, Row } from 'antd'
// import { useNavigate } from 'react-router-dom'

import React from 'react'
import './style.scss'
import { useCreatetrainStationMutation } from '@apps/services/trainStationApi'

const Create = () => {
  // const navigate = useNavigate()
  const [createStation] = useCreatetrainStationMutation()
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}T${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;

  const onFinish = async (values: any) => {
    const payload = {
      ...values,
      createdAt: formattedDate,
      updatedAt: formattedDate,
    };
    try {

      await createStation(payload).unwrap()
      // Xóa thành công
    } catch (err) {
      console.error(err)
      // Xử lý lỗi
    }
    console.log('Success:', payload)
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
                { required: true, message: 'Please input station name!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Địa chỉ ga"
              name="stationPlace"
              rules={[
                { required: true, message: 'Please select place station!' },
              ]}
            >
              <Input />
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
