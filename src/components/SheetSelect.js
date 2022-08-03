import { useEffect, useRef, useState } from "react";
import styles from "./SheetSelect.module.css";

export default function SheetSelect(props) {
  var isActive = useRef(-1);
  isActive.current == -1 && sheetSelectHandler(props.sheetData[0], 0);
  function sheetSelectHandler(sheet, index) {
    isActive.current = index;
    props.setSelectedSheet(sheet);
  }
  return (
    <div className={styles.wrapper}>
      {props.sheetData.map((sheetName, index) => (
        <span
          key={index}
          className={
            index == isActive.current ? styles.active : styles.sheetItem
          }
          onClick={() => sheetSelectHandler(sheetName, index)}
        >
          {sheetName}
        </span>
      ))}
    </div>
  );
}
