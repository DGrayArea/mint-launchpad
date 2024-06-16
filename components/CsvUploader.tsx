import { ConvertToCsv } from "@/helpers/ConvertToCsv";
import React, { useState } from "react";

const CsvUploader: React.FC = () => {
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
    }
  };

  const handleConvert = () => {
    if (csvFile) {
      ConvertToCsv(csvFile);
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleConvert} disabled={!csvFile}>
        Convert to XLSX
      </button>
    </div>
  );
};

export default CsvUploader;
