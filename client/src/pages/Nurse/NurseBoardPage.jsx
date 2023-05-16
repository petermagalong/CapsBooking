import React, { useState ,useEffect} from 'react'
import UserSidebar from '../../components/UserSidebar'
import UserTable from '../../components/UserTable'
import { Doctorscolumns, columns, tableData } from '../../CapsConstant'
import { getActiveDoctors } from '../../services/accounts'

export default function NurseBoardPage() {

  const [activeDoctors, setActiveDoctors] = useState([])

  const getActiveDoctorsValue = async () => {
    const result = await getActiveDoctors()
    setActiveDoctors(result.data)
  }
  useEffect(()=>{
    getActiveDoctorsValue()
  },[])
  return (
    <UserSidebar>
      <UserTable data={activeDoctors.status} columns={Doctorscolumns} hover={false} striped={true} />
    </UserSidebar>
  )
}
