import { useState } from 'react';
import * as XLSX from 'xlsx';


const ExportToExcelButton = ({ data, filename, sheetname }) => {
  const extractData = data.map((item)=>({
    Name:item.Name,
    Speciality:item.Speciality,
    id:item.id,
    City:item.City,
    Email:item.Email,
    LicenseID:item.LicenseID,
    NationalID:item.NationalID,
    Organization:item.Organization,
    PhoneNumber:item.PhoneNumber,
   }))

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(extractData);
    const wb = XLSX.utils.book_new();
    var wscols = [
      {wch:20,s: { font: { bold: true, color: { rgb: "FF0000" }} }},
      {wch:20,s: { font: { bold: true, color: { rgb: "FF0000" }} }},
      {wch:20,s: { font: { bold: true, color: { rgb: "FF0000" }} }},
      {wch:20,s: { font: { bold: true, color: { rgb: "FF0000" }} }},
      {wch:20,s: { font: { bold: true, color: { rgb: "FF0000" }} }},
      {wch:20,s: { font: { bold: true, color: { rgb: "FF0000" }} }},
      {wch:20,s: { font: { bold: true, color: { rgb: "FF0000" }} }},
      {wch:20,s: { font: { bold: true, color: { rgb: "FF0000" }} }},
      {wch:20,s: { font: { bold: true, color: { rgb: "FF0000" }} }}, 
  ];
  ws['!cols'] = wscols;
    XLSX.utils.book_append_sheet(wb, ws, sheetname);
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  return (
   <i className="fa-solid fa-download" onClick={exportToExcel} ><span className='fs-6 fw-light'> excel</span> </i >
  );
};

export default ExportToExcelButton;