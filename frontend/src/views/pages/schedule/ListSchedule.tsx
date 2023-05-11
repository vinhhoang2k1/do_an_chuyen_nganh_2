/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Space, Tag, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { useCallback, useMemo, useState } from 'react'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import GridDataTable from '@components/grid_data/GridDataTable'
import { Moment } from 'moment'

import { useGetSchedulesQuery, useDeleteScheduleMutation } from '@apps/services/scheduleApi'
interface ScheduleData {
  id: number;
  trainId: number;
  startStationId: number;
  endStationId: number;
  timeStart: Date;
  timeRunning: number;
  timeBreak: number;
  createdAt: Date;
  updatedAt: Date;
}
interface ListScheduleProps {
  selectedDate?: Moment | null;
}

const List: React.FC<ListScheduleProps> = (props) => {
  // console.log('đây chính là ngày đã chọn:',selectedDate)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { selectedDate } = props;
  const [deleteSchedule] = useDeleteScheduleMutation()

  // if (selectedDate) {
  //   const dateString = selectedDate.format('YYYY-MM-DD');
  //   console.log('dây là ngày đã chọn:', dateString)
  // }

  const { data: { schedules = [] } = {} } = useGetSchedulesQuery();



  const [list, setList] = useState<ScheduleData[]>([]);

  useEffect(() => {
    setList(schedules);
  }, [schedules]);

  useEffect(() => {
    if (!selectedDate) return; // Nếu không có ngày được chọn thì không làm gì cả

    const dateString = selectedDate.format('YYYY-MM-DD');

    // Lọc ra danh sách các lịch trình có startTime bằng selectedDate
    const newFilteredSchedules = schedules.filter(schedule => moment(schedule.timeStart).format('YYYY-MM-DD') === dateString);

    setList(newFilteredSchedules);
  }, [selectedDate, schedules]);
  // const navigate = useNavigate()

  // const [visibleDeleteConfirm, setVisibleDeleteConfirm] = useState(false)
  // const [seletedDelete, setSeletedDelete] = useState<any>({})
  // const [params, setParams] = useState<ListFloorType>({
  //   code: '',
  //   tower_id: towerId,
  //   status: undefined,
  //   page: defaultCurrentPage,
  //   per_page: defaultPageSize,
  //   order_by: OrderByDESC,
  //   order_key: defaultOrderKey,
  // })
  // const [deleteFloor] = useDeleteFloorMutation()
  // const {
  //   data: listFloors,
  //   isLoading,
  //   isFetching,
  // } = useGetListFloorQuery(params)

  const handlePageChange = useCallback(
    //   (page: number, pageSize: number) => {
    //     setParams({ ...params, page: page, per_page: pageSize })
    //   },
    //   [params],
    () => {
      console.log('a')
    },
    [],
  )
  const handleOpenDeleteConfirm = async (id: number) => {
    // setSeletedDelete(value)
    // setVisibleDeleteConfirm(true)
    try {
      await deleteSchedule(id).unwrap()
      toast.success('Delete success')
    } catch (err) {
      console.error(err)
      // Xử lý lỗi
    }
  }

  // const handleCancelDeleteConfirm = () => {
  // setVisibleDeleteConfirm(false)
  // }

  const columns = useMemo((): ColumnsType<any> => {
    return [
      {
        title: 'STT',
        width: 60,
        render: (_, __, index) => (
          <div style={{ textAlign: 'center', width: '100%' }}>
            {/* {(params.page - 1) * 10 + (index + 1)} */}
            {index + 1}
          </div>
        ),
      },
      {
        title: 'Số ID tàu',
        dataIndex: 'trainNumber',
        key: 'trainNumber',
        ellipsis: true,
        render: (_) => (
          <span
            onClick={() => {
              console.log('a')
            }}
            style={{
              cursor: 'pointer',
              color: '#1d39c4',
            }}
          >
            {_}
          </span>
        ),
        width: 100
      },
      {
        title: 'Ga bắt đầu',
        dataIndex: 'startStation',
        key: 'startStation',
        ellipsis: true,

      },
      {
        title: 'Ga kết thúc',
        dataIndex: 'endStation',
        key: 'endStation',
        ellipsis: true,

      },
      {
        title: 'Ngày khởi hành ',
        dataIndex: 'timeStart',
        key: 'timeStart',
        ellipsis: true,
        render: (timeStart: string) => (
          <span>{moment(timeStart).format('DD/MM/YY HH:mm:ss')}</span>
        ),
      },
      {
        title: 'Thời gian chạy',
        dataIndex: 'timeRunning',
        key: 'timeRunning',
        ellipsis: true,

      },

      {
        title: 'Thời gian nghỉ',
        dataIndex: 'timeBreak',
        key: 'timeBreak',
        ellipsis: true,
      },

      {
        title: "Hành động",
        key: 'action',
        render: (_, value: any) => (
          <Space size="middle" style={{width:'30px'}}>
            <Tooltip placement="bottom" title={t('update')}>
              {/* <Tag
                color={'geekblue'}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  // () => navigate(`/ship-schedule/update/${value.id}`)
                }}
              >
                <EditOutlined />
              </Tag> */}
            </Tooltip>
            <Tooltip placement="bottom" title={t('delete')} >
              <Tag
                color={'red'}
                style={{ cursor: 'pointer' }}
                onClick={() => handleOpenDeleteConfirm(value.id)}
                
              >
                <DeleteOutlined />
              </Tag>
            </Tooltip>
          </Space>
        ),
      },
    ]
  }, [t])

  // useEffect(() => {
  //   disPatch(setLoading({ isLoading: isLoading || isFetching }))
  // }, [isLoading, disPatch, isFetching])
  return (
    <>
     <ToastContainer/>
      <GridDataTable
        columns={columns}
        data={list}
        title={'Lịch chuyến tàu chạy'}
        total={
          // listFloors?.pagination?.total_pages * listFloors?.pagination?.per_page
          0
        }
        buttonCreate={
          <Button
            type="primary"
            className="ml-10 flex-center"
            style={{ gap: '.2rem' }}
            onClick={() => navigate('/ship-schedule/create')}
          >
            {'Tạo mới '}
          </Button>
        }
        handlePageChange={handlePageChange}
      />
    </>
  )
}

export default List
