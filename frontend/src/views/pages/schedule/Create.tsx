/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Card, Col, Form, Input, Row, Select } from 'antd'
// import { useNavigate } from 'react-router-dom'

import React from 'react'
import './style.scss'
import { useCreateScheduleMutation } from '@apps/services/scheduleApi'
import { useGettrainStationsQuery } from '@apps/services/trainStationApi'
// import { useGettrainsQuery } from '@apps/services/trainApi'
const Create = () => {
    // const navigate = useNavigate()
    const [createSchedule] = useCreateScheduleMutation();

    // const { data: { trains = [] } = {} } = useGettrainsQuery()
    const { data: { trains = [] } = {} } = useGettrainStationsQuery()

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}T${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;
    const onFinish = async (values: any) => {
        const payload = {
            ...values,
            createdAt: formattedDate,
            updatedAt: formattedDate,
        };
        try {

            await createSchedule(payload).unwrap()
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
        <Card id="create-train" title="Tạo mới lịch trình" bordered={true}>
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
                            label="Ga bắt dầu"
                            name="startStationId"
                            rules={[
                                { required: true, message: 'Please select start Station!' },
                            ]}
                        >
                            <Select>
                                {trains.map((station) => {

                                    return (
                                        <Select.Option key={station.id}>
                                            {station.stationName}
                                        </Select.Option>
                                    );
                                })}

                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Ga kết thúc"
                            name="endStationId"
                            rules={[
                                { required: true, message: 'Please select start Station!' },
                            ]}
                        >
                            <Select>
                                {trains.map((station) => {
                                    return (
                                        <Select.Option key={station.id}>
                                            {station.stationName}
                                        </Select.Option>
                                    );
                                })}

                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Ngày bắt dầu"
                            name="timeStart"
                            rules={[
                                { required: true, message: 'Please select place station!' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Thời gian chạy"
                            name="timeRunning"
                            rules={[
                                { required: true, message: 'Please select place station!' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Thòi gian nghỉ"
                            name="timeBreak"
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
