import React from 'react'
import UserSidebar from '../../components/UserSidebar'
import { columns, tableData } from '../../CapsConstant'
import UserTable from '../../components/UserTable'

export default function ClerkInventory() {
  return (
    <UserSidebar>
      <UserTable data={tableData} columns={columns} hover={true} striped={true} />
    </UserSidebar>
  )
}
