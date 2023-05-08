
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
      <Card>
        <Table style={{ width: '80vw', height: '80vh' }}>
          <thead>
            <tr>
              {columns &&
                columns.map((head) => (
                  <th>{getCaps(head.header, head.field)}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((row) => (
                <tr className={`${hover && "hover"} ${striped && "striped"}`}>
                  {columns.map((col) => (
                    <td>{row[col.field]}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default UserTable;
