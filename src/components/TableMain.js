//import
import React, { useState, useEffect } from "react";


function TableMain(props) {
    let definitions = props.data;
    let columns = props.columns;

return(
        <table>
            <thead>
                <tr>
                    {columns.map((item, idx) => 
                        <th key = {idx.toString()}>{item}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {definitions.map((item, idx) => 
                <tr key={item.id.toString()}>
                    {columns.map((col, colIdx) =>
                        <td key = {idx.toString() + '-' + colIdx.toString()} >{item[col]}</td>
                    )}
                </tr>
                )}
            </tbody>
        </table>
    )
}

export default TableMain;