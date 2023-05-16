
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
  openLog = null
}) => {
  const location = useLocation();
  const userpath = location.pathname.includes('/nurse/schedule')
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
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ?
              (data.map((row, index2) => (
                <>
                  {onClick !== null ? (

                    <tr
                      key={index2 + row + 'asd'}
                      onClick={() => onClick(row)}
                      className={`${hover && "hover"} ${striped && "striped"}`}
                    >
                      {columns.map((col, index) => (
                        <td style={{ height: '60px' }} key={index}>
                          {row[col.field]}
                        </td>
                      ))}

                      {userpath &&
                        <Button>UPDATE</Button>
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
