/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Card, Col, Form, Input, Row, Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

import React from 'react'
import { useUpdatetrainMutation, useGettrainQuery } from '@apps/services/trainApi'
import './style.scss'
const Update = () => {
  const navigate = useNavigate()
  const trainId = useParams()
  const num = Number(trainId.id)
  const { data: { train = [] } = {}, isLoading, isFetching } = useGettrainQuery(num);
  console.log('train:', train, isLoading, isFetching)


  const [updateTrain] = useUpdatetrainMutation()
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}T${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;
  const onFinish = async (values: any) => {
    const payload = {
      ...trainId,
      ...values,
      updatedAt: formattedDate,
    };
    try {

      await updateTrain(payload).unwrap()
      // Xóa thành công
    } catch (err) {
      console.error(err)
      // Xử lý lỗi
    }
    console.log('Success', payload)
    navigate('/train/list')
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Card id="create-train" title="Sửa thông tin tàu" bordered={true}>
      {
        !isFetching && train?.map((post) => {
          return (
            <Form
              key={post.id}
              id="create-form"
              name="create-user"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ 
                remember: true,
                trainNumber:post.trainNumber,
                seatsNumber:post.seatsNumber,
                status:post.status
               }}
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
                    <Input defaultValue={post.trainNumber} />
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
                    <Input defaultValue={post.seatsNumber} />
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
                    defaultValue={post.status}
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
          )
        })
      }

    </Card>
  )
}

export default Update
