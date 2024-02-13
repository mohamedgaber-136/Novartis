import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";

import "./Table.css";
import { SelectComponent } from "../SelectComponent/SelectComponent";
export default function BasicTable({ rows }) {
  return (
    <TableContainer
      component={Paper}
      className="BasicTableParent basicTableHeight"
    >
      <Toolbar className="text-end  d-flex justify-content-end w-100">
        <SelectComponent />
      </Toolbar>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Event Name</TableCell>
            <TableCell>Franchise</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, indx) => (
            <TableRow
              key={`${row.EventName}-${indx}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.Id}</TableCell>
              <TableCell>{row.EventName}</TableCell>

              <TableCell>{row.Franchise}</TableCell>
              <TableCell>{row.CreatedAt}</TableCell>
              <TableCell>{row.EndDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
