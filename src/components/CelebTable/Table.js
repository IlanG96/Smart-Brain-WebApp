import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import { COLUMN } from "./Column";
import './Table.css'

export const BasicTable = ({DATA}) => {
  let counter =1;
  const Array=DATA.map((obj)=>{
    obj.id=counter++;    
    var precise = obj.value.toPrecision(3); //"6.123"
    var result = parseFloat(precise); //6.123
    obj.percentage = (result*100).toPrecision(3);
    return obj;
  })
  const [selectedId, setSelectedId] = useState(-1)
  const columns = useMemo(() => COLUMN, []);
  const data = useMemo(() => Array, [Array]); // [Array]-> update the table each time there's a change in Array
  // console.log("Data: " ,data);

  const [column, setColumn] = useState(-1)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  const getCellValue = (e, j) => {
    console.log(e);
    // setCellValue((cellvalue) =>
    //   cellvalue === "blue" ? (cellvalue = "red") : (cellvalue = "blue")
    // );
    setSelectedId(e.row.id)
    setColumn(j)
  };

  return (
    <>
    <article id="celebTable" className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5">    
      <table {...getTableProps()} >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell,j) => {
                  return (
                    <td
                      // onClick={() => getCellValue(cell,j)}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        // background: 'linear-gradient(89deg, #4568dc 0%, #9d57e7 100%)'
                      }}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </article>
    </>
  );
};
