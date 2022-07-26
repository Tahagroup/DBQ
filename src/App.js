import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import RowList from "./components/RowList";
import logo from "./Excel-icon.png";

function App() {
  const [tableData, setTableData] = useState([[], []]);
  const [isLoading, setIsLoading] = useState(false);
  function tableDataProvider(data) {
    setTableData(data);
  }

  const hasData = tableData[0].length !== 0;
  return (
    <React.Fragment>
      <Header
        tableDataProvider={tableDataProvider}
        setIsLoading={setIsLoading}
      />
      {hasData ? (
        <RowList tableData={tableData} isLoading={isLoading} />
      ) : (
        noFilePage()
      )}
    </React.Fragment>
  );
}

export default App;
function noFilePage() {
  return (
    <div className="no-excel--wrapper">
      <span className="excel-text">
        <div>با دکمه بالای صفحه</div>
        <div>یک فایل اکسل</div>
        <div>.انتخاب کنید</div>
        {/* .با دکمه بالای صفحه یک فایل اکسل انتخاب کنید */}
      </span>
      <img src={logo} alt="excel" className="excel-icon" />
    </div>
  );
}
