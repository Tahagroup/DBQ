import { React, useRef } from "react";
import * as xlsx from "xlsx";

import styles from "./Header.module.css";

const Header = (props) => {
  let fileName = useRef("");

  const onExcelSelect = (e) => {
    props.isloading(true);

    const [file] = e.target.files;
    const reader = new FileReader();
    reader.onload = (evt) => {
      props.isloading(false);
      props.tableDataProvider([[], []]);
      // props.setSheetNames();
      const bstr = evt.target.result;
      const wb = xlsx.read(bstr, { type: "binary" });
      props.setSheetNames(wb.SheetNames);
      props.onExcelFileSelected(e);
      // setting doc title:
      fileName.current = e.target.value.replace(/.*[\/\\]/, "").toString(); //Manipulating the DOM :(, can be replaced with useState
      const excelFileName = fileName.current.split(".").slice(0, -1);
      document.title = excelFileName.join(".");
    };
    try {
      reader.readAsBinaryString(file);
    } catch (error) {
      props.isloading(false);
    }
  };

  return (
    // <div className={styles.header}>
    <div className={`${styles.header} unselectable`}>
      <div className={styles.titleFlex}>
        <span className={styles.title}>
          Excely<sup className={styles.version}>v1.4</sup>
        </span>
        <span className={styles.subtitle}>نمایشگر فایل های اکسل</span>
        <a className={styles.link} href="https://github.com/Tahagroup/excely">
          Dev: Yasin.bsr
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
