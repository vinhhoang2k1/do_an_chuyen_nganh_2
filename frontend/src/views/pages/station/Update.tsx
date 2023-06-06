/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Card, Col, Form, Input, Row, Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import {  toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import React from 'react'
import './style.scss'
import { useUpdatetrainStationMutation, useGettrainStationQuery } from '@apps/services/trainStationApi'

const Update = () => {
  const navigate = useNavigate()
  const stationId = useParams()
  const num = Number(stationId.id)
  const { data: { trainStation = [] } = {}, isLoading, isFetching } = useGettrainStationQuery(num)
  console.log('train station:', trainStation, isLoading, isFetching)

  const [updateStation] = useUpdatetrainStationMutation()
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}T${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;

  const onFinish = async (values: any) => {
    const payload = {
      ...stationId,
      ...values,
      updatedAt: formattedDate,
    };
    try {

      await updateStation(payload).unwrap()
      toast.success('Cập nhật trạm ga thành công')
      // Xóa thành công
    } catch (err) {
      console.error(err)
      // Xử lý lỗi
    }
    console.log('Success:', payload)
    navigate('/station/list')
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Card id="create-station" title="Sửa thông tin nhà ga" bordered={true}>
      {
        !isFetching && trainStation?.map((post) => {
          return (
            <Form
            key={post.id}
              id="create-form"
              name="create-user"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{
                remember: true,
                stationName:post.stationName,
                stationPlace:post.stationPlace
               }}
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
                    <Input defaultValue={post.stationName} />
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
                    <Select
                      defaultValue={post.stationPlace}
                      options={[
                        {
                          value: 'Hà Nội',
                          label: 'Hà Nội',
                        },
                        {
                          value: 'Hồ Chí Minh',
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
          )
        })
      }

    </Card>
  )
}

export default Update
