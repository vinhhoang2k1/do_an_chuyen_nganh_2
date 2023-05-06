import React, { useState } from 'react'
import { Calendar, Card, Col, Row, Button, Modal } from 'antd'
import { Moment } from 'moment'
import type { CalendarMode } from 'antd/es/calendar/generateCalendar'
import ListSchedule from './ListSchedule'
import './style.scss'
const Schedule = () => {
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
    }, 1000)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }
  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode)
  }

  return (
    <div id="schedule">
      <Row gutter={10}>
        <Col span={24}>
          <div className="box-calendar">
            <Modal
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <Calendar onPanelChange={onPanelChange} />
            </Modal>
          </div>
        </Col>

        <Col span={24}>
          <Card>
            <Button type="primary" onClick={showModal}>
              Chọn ngày
            </Button>
            <ListSchedule />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Schedule