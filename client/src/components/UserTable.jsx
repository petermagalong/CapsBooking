
import React from "react";
import { Button, Card, Stack, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
// import "./table.css";
const UserTable = ({
  data = null,
  columns = null,
  hover = true,
  striped = true,
  onClick = null,
  action=null,
  openLog = null,
  page=''
}) => {
  const location = useLocation();
  const userpath = location.pathname.includes('/nurse/schedule')
  const adminpath = location.pathname.includes('/admin/schedule')
  const getCaps = (head, field, path) => {
    if (head) return head.toUpperCase();
    return field.toUpperCase();
  };
  return (
    <div>
      <Card style={{ marginTop: '50px' }}>
        <Table style={{ width: '80vw' }}>
          <thead style={{ backgroundColor: '#3C1220 ', height: '8vh', color: 'white', justifyContent: 'center' }}>
            <tr>
              {columns &&
                columns.map((head, index1) => (
                  <th key={index1} >{getCaps(head.header, head.field)}</th>
                ))}
                {(page || onClick) && <th key={1000} >Action</th>}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ?
              (data.map((row, index2) => (
                <>
                  {onClick !== null ? (

                    <tr
                      key={index2 + row.toString() + 'asd'}
                      
                      className={`${hover && "hover"} ${striped && "striped"}`}
                    >
                      {columns.map((col, index) => (
                        <td style={{ height: '60px' }} key={index} onClick={() => onClick({...row,path:page === 'schedule' && "logs"})} >
                          {row[col.field]}
                        </td>
                      ))}

                      {(userpath || adminpath) && page === 'schedule' &&
                        <td className="text-center">
                        <Button onClick={() => action.update(row)}>UPDATE</Button>
                        {row?.appointment_status==='completed' && <Button onClick={() => action.result({...row,path:"transaction"})}>Result</Button>}
                        </td>
                      }

                      {
                        page === 'patienttransact' && <Button onClick={() => action(row)}>Download</Button>
                      }
                    </tr>
                  ) : (
                    <tr
                      key={index2 + row + 'asd'}
                      className={`${hover && "hover"} ${striped && "striped"}`}
                    >
                      {columns.map((col, index) => (
                        <td style={{ height: '60px' }} key={index}>
                          {row[col.field]}
                        </td>
                      ))}
                      
                        {
                          page === 'patienttransact' && (
                           <td style={{ height: '60px' }} key={row}>
                           <Button onClick={() => action(row)}>Download</Button>
                          </td>)
                        }
                      
                    </tr>
                  )}</>
              ))) : ''
            }
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default UserTable;
