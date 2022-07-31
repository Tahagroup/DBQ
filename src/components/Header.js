import { React, useRef } from "react";
import * as xlsx from "xlsx";

import styles from "./Header.module.css";

const Header = (props) => {
  let fileName = useRef("");

  const onExcelSelect = (e) => {
    props.setloading(true);
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.onload = (evt) => {
      props.setloading(false);
      const bstr = evt.target.result;
      const wb = xlsx.read(bstr, { type: "binary" });
      props.setSheetNames(wb.SheetNames);
      props.onExcelFileSelected(e);
      // const wsname = wb.SheetNames[0];
      // const ws = wb.Sheets[wsname]; //worksheet name
      // const jsonData = xlsx.utils.sheet_to_json(ws);
      fileName.current = e.target.value.replace(/.*[\/\\]/, "").toString(); //Manipulating the DOM :(, can be replaced with useState
      document.title = fileName.current.split(".")[0];
    };
    // #FIXME:
    try {
      reader.readAsBinaryString(file);
    } catch (error) {
      props.setloading(false);
    }
  };

  return (
    // <div className={styles.header}>
    <div className={`${styles.header} unselectable`}>
      <div className={styles.titleFlex}>
        <span className={styles.title}>
          DBQ<sup className={styles.version}>v1.4</sup>
        </span>
        <span className={styles.subtitle}>نمایشگر فایل های اکسل</span>
        <a className={styles.link} href="https://github.com/Tahagroup/DBQ">
          Developer: Yasin Basiri
        </a>
      </div>
      {fileName.current && (
        <div className={styles.fileName}>
          <div className={styles.subtitle}>:فایل بارگذاری شده</div>
          <div className={styles.excelName}> {fileName.current}</div>
        </div>
      )}
      <div className={styles.fileInput}>
        <input
          onChange={onExcelSelect}
          type="file"
          id="file"
          className={styles.file}
        />
        <label htmlFor="file" className={styles.filePicker}>
          انتخاب فایل
        </label>
      </div>
    </div>
  );
};

export default Header;
