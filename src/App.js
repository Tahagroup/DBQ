import * as xlsx from "xlsx";
import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import SheetSelect from "./components/SheetSelect";
import logo from "./Excel-icon.png";
import LoadingSpinner from "./components/loadingSpinner";

function App() {
  const [tableData, setTableData] = useState([[], []]);
  const [isLoading, setIsLoading] = useState(false);
  const [sheetData, setSheetData] = useState();
  const [selectedExcelFile, setselectedExcelFile] = useState();
  function tableDataProvider(data) {
    setTableData(data);
  }

  function dataLoadHandler(loading) {
    setIsLoading(loading);
  }

  function setSheetNames(data) {
    setSheetData(data);
  }

  function selectedExcelFileHandler(data) {
    setselectedExcelFile(data);
  }

  function SelectedSheetHandler(sheetNameData) {
    setIsLoading(true);
    const [file] = selectedExcelFile.target.files;
    const reader = new FileReader();
    if (sheetData.length > 1) {
      document.title = sheetNameData;
    }
    reader.onload = (evt) => {
      setIsLoading(false);
      const bstr = evt.target.result;
      const wb = xlsx.read(bstr, { type: "binary" });
      const wsname = sheetNameData;
      const ws = wb.Sheets[wsname];
      const jsonData = xlsx.utils.sheet_to_json(ws);
      setTableData([jsonData, Object.keys(jsonData[0])]); //[[array of data without headers],[headers]]
    };
    try {
      reader.readAsBinaryString(file);
    } catch (error) {
      setIsLoading(false);
    }
  }

  const hasData = tableData[0].length !== 0;
  return (
    <React.Fragment>
      <Header
        tableDataProvider={tableDataProvider}
        isloading={dataLoadHandler}
        setSheetNames={setSheetNames}
        onExcelFileSelected={selectedExcelFileHandler}
      />
      {sheetData && (
        <SheetSelect
          sheetData={sheetData}
          setSelectedSheet={SelectedSheetHandler}
        />
      )}
      {hasData && <MainContent tableData={tableData} loading={isLoading} />}
      {!hasData && sheetData && <LoadingSpinner />}
      {!hasData && !sheetData && noFilePage(sheetData)}
    </React.Fragment>
  );
}

export default App;
function noFilePage(sheetData) {
  return (
    <div className="no-excel--wrapper">
      <img src={logo} alt="excel" className="excel-icon" />
      {
        <span className="excel-text">
          <div>با دکمه بالای صفحه</div>
          <div>یک فایل اکسل</div>
          <div>.انتخاب کنید</div>
        </span>
      }
    </div>
  );
}
