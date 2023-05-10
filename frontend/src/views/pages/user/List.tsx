/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Space, Tag, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { useCallback, useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import GridDataTable from '@components/grid_data/GridDataTable'

import { useGetUsersQuery, useDeleteUserMutation } from '@apps/services/userApi'

import './style.scss'

const List: React.FC = () => {
  const { t } = useTranslation()
  const { data: { admins = [] } = {} } = useGetUsersQuery();
  console.log('list user:', admins);

  const [deleteUser] = useDeleteUserMutation()
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
    try {
      await deleteUser(id).unwrap()
      // Xóa thành công
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
        title: 'Họ tên',
        dataIndex: 'fullName',
        key: 'fullName',
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
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        ellipsis: true,
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        ellipsis: true,
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
                // onClick={() => useUpdateUserMutation(value)}
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
      <GridDataTable
        columns={columns}
        data={admins}
        title={'Danh sách người dùng'}
        total={
          // listFloors?.pagination?.total_pages * listFloors?.pagination?.per_page
          0
        }
        buttonCreate={
          <Button
            type="primary"
            className="ml-10 flex-center"
            style={{ gap: '.2rem' }}
            onClick={() => { navigate('/user/create') }}
          >
            {'Tạo người dùng'}
          </Button>
        }
        handlePageChange={handlePageChange}
      />
    </>
  )
}

export default List
