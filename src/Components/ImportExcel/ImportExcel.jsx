import React from "react";
import * as XLSX from "xlsx";
import DownloadIcon from '@mui/icons-material/Download';
 const ImportExcel = () => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle the Excel file here
      handleExcelFile(file);
    }
  };
  const handleExcelFile = (file) => {
    // Use xlsx library to parse the Excel file
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      // Process the workbook data (e.g., extract sheets, data, etc.)
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const Finaledata = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
    };

    reader.readAsBinaryString(file);
   
  };

  return (<div className=" darkBlue d-flex justify-content-center align-items-center   " >
    <label htmlFor="importFile" tabindex={1}>
      {/* <DownloadIcon className="text-white"/> */}
      Import
    </label>
      <input type="file" id='importFile' className="d-none"  accept=".xlsx" onChange={handleFileChange} />
  </div>
  );
};
export default ImportExcel;