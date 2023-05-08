import React from 'react'
import UserSidebar from '../../components/UserSidebar'
import UserTable from '../../components/UserTable'

export default function Admin() {
  return (
    <>
      <UserSidebar >
        <UserTable />
      </UserSidebar>
    </>
  )
}
