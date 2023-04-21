/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React from 'react'
import './styles.scss'

type Props = {
  columns: ColumnsType<any>
  buttonCreate?: JSX.Element
  data: any[]
  title?: string
  total: number
  handlePageChange?: (page: number, pageSize: number) => void
  buttonImport?: JSX.Element
}

const GridDataTable = ({
  columns,
  buttonCreate,
  data,
  title,
  handlePageChange,
  total,
  buttonImport,
}: Props) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      title={() => (
        <>
          <div className={`flex-between ${buttonImport && 'mb-10'}`}>
            <div>
              <span>{title}</span>
            </div>
            {buttonImport && buttonImport}
          </div>
          <div className="flex-end">{buttonCreate && buttonCreate}</div>
        </>
      )}
      // scroll={{ x: '480px', y: '55vh' }}
      pagination={{
        onChange: handlePageChange,
        total,
        position: ['bottomCenter'],
      }}
      id="grid-data-table"
    />
  )
}

export default GridDataTable
