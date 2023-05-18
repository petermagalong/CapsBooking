import React, { useEffect, useState } from 'react'
import UserSidebar from '../../components/UserSidebar'
import UserTable from '../../components/UserTable'
import { Suppliercolumns, columns, tableData } from '../../CapsConstant'
import { getAllSupplier } from '../../services/inventory'

export default function ClerkSupply() {
  const [getSupplierData,setSupplierData ] = useState([])

  const getAllSupplierHandler =async () =>{
    const result = await getAllSupplier()
    console.log(result,"resultsadresult")
    setSupplierData(result.data)
    
  }

  useEffect(()=>{
    getAllSupplierHandler()
  },[])
  return (
    <UserSidebar>
      <UserTable data={getSupplierData.status} columns={Suppliercolumns} hover={true} striped={true} />
    </UserSidebar>
  )
}
