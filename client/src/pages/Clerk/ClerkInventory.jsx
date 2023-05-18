import React, { useEffect, useState } from 'react'
import UserSidebar from '../../components/UserSidebar'
import { Inventorycolumns, columns, tableData } from '../../CapsConstant'
import UserTable from '../../components/UserTable'
import { getAllInventoryItems, getInventoryItems } from '../../services/inventory'

export default function ClerkInventory() {
  const [getSupplierData,setSupplierData ] = useState([])

  const getAllSupplierHandler =async () =>{
    const result = await getAllInventoryItems()
    console.log(result,"resultsadresult")
    setSupplierData(result.data)
    
  }

  useEffect(()=>{
    getAllSupplierHandler()
  },[])
  return (
    <UserSidebar>
      <UserTable data={getSupplierData.status} columns={Inventorycolumns} hover={false} striped={true} />
    </UserSidebar>
  )
}
