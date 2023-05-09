import React from 'react'
import UserTable from '../../components/UserTable'
import { columns, tableData } from '../../CapsConstant'

export default function AdminSchedulePage() {
  return (
    <UserTable data={tableData} columns={columns} hover={true} striped={true} />
  )
}
