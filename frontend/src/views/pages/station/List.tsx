/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Space, Tag, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { useCallback, useMemo } from 'react'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import GridDataTable from '@components/grid_data/GridDataTable'

import {
  useGettrainStationsQuery,
  useDeletetrainStationMutation
} from '@apps/services/trainStationApi'

const List: React.FC = () => {
  const { t } = useTranslation()
  const { data: { trainStations = [] } = {} } = useGettrainStationsQuery();

  const [deleteStation] = useDeletetrainStationMutation()
  const navigate = useNavigate()

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
    console.log('dây là id:', id);
    try {
      await deleteStation(id).unwrap()
      toast.success('Delete successfull')
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
        title: 'Tên nhà ga',
        dataIndex: 'stationName',
        key: 'stationName',
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
      },
      {
        title: 'Địa chỉ',
        dataIndex: 'stationPlace',
        key: 'stationPlace',
        ellipsis: true,
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
        ellipsis: true,
        render: (createdAt: string) => (
          <span>{moment(createdAt).format('DD/MM/YYYY')}</span>
        ),
      },
      {
        title: 'Ngày sửa',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        ellipsis: true,
        render: (updatedAt: string) => (
          <span>{moment(updatedAt).format('DD/MM/YYYY')}</span>
        ),
      },
      {
        title: "Hành động",
        key: 'action',
        render: (_, value: any) => (
          <Space size="middle">
            <Tooltip placement="bottom" title={t('update')}>
              <Tag
                color={'geekblue'}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/station/update/${value.id}`)}
              >
                <EditOutlined />
              </Tag>
            </Tooltip>
            <Tooltip placement="bottom" title={t('delete')}>
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
      <ToastContainer />
      <GridDataTable
        columns={columns}
        data={trainStations}
        title={'Danh sách nhà ga'}
        total={
          // listFloors?.pagination?.total_pages * listFloors?.pagination?.per_page
          0
        }
        buttonCreate={
          <Button
            type="primary"
            className="ml-10 flex-center"
            style={{ gap: '.2rem' }}
            onClick={() => { navigate('/station/create') }}
          >
            {'Tạo nhà ga'}
          </Button>
        }
        handlePageChange={handlePageChange}
      />
    </>
  )
}

export default List;