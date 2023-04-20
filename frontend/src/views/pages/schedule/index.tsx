import React from 'react'
import { Calendar, Card, Col, Row } from 'antd'
import { Moment } from 'moment'
import type { CalendarMode } from 'antd/es/calendar/generateCalendar'
import ListSchedule from './ListSchedule'
import './style.scss'
const Schedule = () => {
  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode)
  }
  return (
    <div id="schedule">
      <Row gutter={10}>
        <Col span={8}>
          <Card className="box-calendar">
            <Calendar onPanelChange={onPanelChange} />
          </Card>
        </Col>
        <Col span={16}>
          <Card>
            <ListSchedule />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Schedule
