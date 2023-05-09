
import React from "react";
import { Card, Table } from "react-bootstrap";
// import "./table.css";
const UserTable = ({
  data = null,
  columns = null,
  hover = true,
  striped = true,
}) => {
  const getCaps = (head, field) => {
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
                columns.map((head) => (
                  <th>{getCaps(head.header, head.field)}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ?
              (data.map((row) => (
                <tr key={row} className={`${hover && "hover"} ${striped && "striped"}`}>
                  {columns.map((col) => (
                    <td style={{ height: '60px' }} key={col}>{row[col.field]}</td>
                  ))}
                </tr>
              ))) : ''
            }
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default UserTable;
