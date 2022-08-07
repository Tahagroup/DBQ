import { React, useMemo } from "react";

import Table from "./Table";
import styles from "./MainContent.module.css";
import LoadingSpinner from "./loadingSpinner";

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
  /////////////////////////////////
  // return <LoadingSpinner />;
  return props.loading ? (
    <LoadingSpinner />
  ) : (
    <div className={styles.tableContainer}>
      <Table columns={columns} data={props.tableData[0]} />
    </div>
  );
}

export default RowList;
