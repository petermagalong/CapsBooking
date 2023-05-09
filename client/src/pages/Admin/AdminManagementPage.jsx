import React from 'react'
import UserTable from '../../components/UserTable'
import { columns, tableData } from '../../CapsConstant'

export default function AdminManagementPage() {
  return (
    <UserTable data={tableData} columns={columns} hover={true} striped={true} />
  )
}
