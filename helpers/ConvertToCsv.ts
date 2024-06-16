import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const ConvertToCsv = (csvFile: File) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const csvData = e.target?.result as string;
  
      // Convert CSV string to workbook
      const workbook = XLSX.read(csvData, { type: 'binary' });
  
      // Ensure all cells are treated as strings
      workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const range = XLSX.utils.decode_range(worksheet['!ref']!);
        
        for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
          for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
            const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
            if (!worksheet[cellAddress]) continue;
            const cell = worksheet[cellAddress];
            if (cell.t === 'n' && /^0x[a-fA-F0-9]+$/.test(cell.v)) {
              cell.t = 's'; // Change the cell type to string
              cell.z = undefined; // Remove any formatting
            }
          }
        }
      });
  
      // Create array representation of the data
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const csvArray = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
      // Convert workbook back to XLSX
      const xlsxData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
      // Create a Blob containing the XLSX data
      const blob = new Blob([xlsxData], { type: 'application/octet-stream' });
  
      // Save Blob as XLSX file using FileSaver.js
      saveAs(blob, `${csvFile.name.split('.')[0]}.xlsx`);
  
      // Log array representation (for demonstration, you can remove this in production)
      console.log('Array Representation:', csvArray);
    };
  
    // Read the CSV file as binary string
    reader.readAsBinaryString(csvFile);
  };