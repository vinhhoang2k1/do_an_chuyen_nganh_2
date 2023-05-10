/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Card, Col, Form, Input, Row, Select } from 'antd'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { DatePicker } from 'antd'
import React from 'react'
import './style.scss'
import { useCreateScheduleMutation } from '@apps/services/scheduleApi'
import { useGettrainStationsQuery } from '@apps/services/trainStationApi'
import { useGettrainsQuery } from '@apps/services/trainApi'

const Create = () => {
    // const navigate = useNavigate()
    const [createSchedule] = useCreateScheduleMutation();

    const { data: { trains = [] } = {} } = useGettrainsQuery()
    const { data: { trainStations = [] } = {} } = useGettrainStationsQuery()

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}T${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;
    const onFinish = async (values: any) => {
        const { timeStart, ...otherValues } = values;
        const formattedTimeStart = moment(timeStart).format("YYYY-MM-DDTHH:mm:ss.SSS"); // Định dạng lại giá trị của timeStart
        const payload = {
            ...otherValues, // Sử dụng các trường khác
            createdAt: formattedDate,
            updatedAt: formattedDate,
            timeStart: formattedTimeStart
        };
        try {

            await createSchedule(payload).unwrap()
            toast.success('Tạo lịch trình thành công')
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
            <ToastContainer/>
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
                            name="trainId"
                            rules={[
                                { required: true, message: 'Please select train number!' },
                            ]}
                        >
                            <Select>
                                {trains.map((train) => {
                                    if (train.status === 1) {
                                        return (
                                            <Select.Option key={train.id} value={train.id}>
                                                {train.trainNumber}
                                            </Select.Option>
                                        );
                                    }
                                })}

                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Ga bắt dầu"
                            name="startStationId"
                            rules={[
                                { required: true, message: 'Please select start Station!' },
                            ]}
                        >
                            <Select>
                                {trainStations.map((station) => {

                                    return (
                                        <Select.Option key={station.id} value={station.id}>
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
                                { required: true, message: 'Please select end Station!' },
                            ]}
                        >
                            <Select>
                                {trainStations.map((station) => {
                                    return (
                                        <Select.Option key={station.id} value={station.id}>
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
                                { required: true, message: 'Please select time start!' },
                            ]}
                        >
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Thời gian chạy"
                            name="timeRunning"
                            rules={[
                                { required: true, message: 'Please select time running!' },
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
                                { required: true, message: 'Please select time break!' },
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
