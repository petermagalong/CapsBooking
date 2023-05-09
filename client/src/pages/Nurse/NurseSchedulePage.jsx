import React from 'react'
import UserSidebar from '../../components/UserSidebar'
import UserTable from '../../components/UserTable'
import { columns, tableData } from '../../CapsConstant'

export default function NurseSchedulePage() {
  return (
    <UserSidebar>
      <UserTable data={tableData} columns={columns} hover={true} striped={true} />
    </UserSidebar>
  )
}
