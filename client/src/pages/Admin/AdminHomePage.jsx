import React from 'react'
import UserTable from '../../components/UserTable'
import { columns, tableData } from '../../CapsConstant'
import UserSidebar from '../../components/UserSidebar'

export default function AdminHomePage() {
  return (
    <UserSidebar>
      hello
      <UserTable data={tableData} columns={columns} hover={true} striped={true} />
    </UserSidebar>

  )
}
