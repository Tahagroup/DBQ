import { useState } from "react";
import styles from "./SheetSelect.module.css";

export default function SheetSelect(props) {
  // props.setSelectedSheet(props.sheetData[0]);

  const [isActive, setisActive] = useState(0);
  function sheetSelectHandler(sheet, index) {
    setisActive(index);
    props.setSelectedSheet(sheet);
  }

  return (
    <div className={styles.wrapper}>
      {props.sheetData.map((sheetName, index) => (
        <span
          key={index}
          className={index == isActive ? styles.active : styles.sheetItem}
          onClick={() => sheetSelectHandler(sheetName, index)}
        >
          {sheetName}
        </span>
      ))}
    </div>
  );
}
