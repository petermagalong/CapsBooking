import React from 'react'
import UserSidebar from '../../components/UserSidebar'
import { columns, tableData } from '../../CapsConstant'
import UserTable from '../../components/UserTable'


export default function NurseHomePage() {
  return (
    <div>
      <UserSidebar>
        <UserTable data={tableData} columns={columns} hover={false} striped={true} />
      </UserSidebar >
    </div >
  )
}
