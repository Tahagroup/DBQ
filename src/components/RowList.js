import { React, useMemo } from "react";

import Table from "./Table";
import styles from "./RowList.module.css";

// import { getThemeProps } from "@material-ui/styles";

function RowList(props) {
  const columns = useMemo(
    () =>
      props.tableData[1].map((header) => {
        return {
          Header: `${header}`,
          accessor: `${header}`,
        };
      }),
    [props.tableData[1]]
  );

  return props.isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className={styles.tableContainer}>
      <Table columns={columns} data={props.tableData[0]} />
    </div>
  );
}

export default RowList;
