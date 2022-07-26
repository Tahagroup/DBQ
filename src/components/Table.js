import React from "react";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import { alpha, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
// import IconButton from "@material-ui/core/IconButton";

// import FirstPageIcon from "@material-ui/icons/FirstPage";
// import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// import LastPageIcon from "@material-ui/icons/LastPage";

import { useTable, useSortBy, useFilters, usePagination } from "react-table";

import styles from "./Table.module.css";
// import generateExcel from "zipcelx";

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <StyledInput
      className={styles.filterInputs}
      margin="none"
      variant="outlined"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      // prevent sorting on filter click
      onClick={(e) => e.stopPropagation()}
      style={{
        direction: "rtl",
      }}
      placeholder={`${count} سطر`}
    />
  );
}
const StyledInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 14,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

// function TablePaginationActions({
//   previousPage,
//   nextPage,
//   gotoPage,
//   canPreviousPage,
//   canNextPage,
//   pageCount,
// }) {
//   const handleFirstPageButtonClick = () => {
//     gotoPage(0);
//   };

//   const handleBackButtonClick = () => {
//     previousPage();
//   };

//   const handleNextButtonClick = () => {
//     nextPage();
//   };

//   const handleLastPageButtonClick = () => {
//     gotoPage(pageCount - 1);
//   };

//   return (
//     <div style={{ flexShrink: 0 }}>
//       <IconButton
//         onClick={handleFirstPageButtonClick}
//         disabled={!canPreviousPage}
//         aria-label="first page"
//       >
//         <FirstPageIcon />
//       </IconButton>
//       <IconButton
//         onClick={handleBackButtonClick}
//         disabled={!canPreviousPage}
//         aria-label="previous page"
//       >
//         <KeyboardArrowLeft />
//       </IconButton>
//       <IconButton
//         onClick={handleNextButtonClick}
//         disabled={!canNextPage}
//         aria-label="next page"
//       >
//         <KeyboardArrowRight />
//       </IconButton>
//       <IconButton
//         onClick={handleLastPageButtonClick}
//         disabled={!canNextPage}
//         aria-label="last page"
//       >
//         <LastPageIcon />
//       </IconButton>
//     </div>
//   );
// }

function Table({ columns, data }) {
  // const filterTypes = React.useMemo(
  //   () => ({
  //     // Or, override the default text filter to use
  //     // "startWith"
  //     text: (rows, id, filterValue) => {
  //       return rows.filter(row => {
  //         const rowValue = row.values[id]
  //         return rowValue !== undefined
  //           ? String(rowValue)
  //               .toLowerCase()
  //               .startsWith(String(filterValue).toLowerCase())
  //           : true
  //       })
  //     },
  //   }),
  //   []
  // );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    rows,

    // pagination stuff
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    nextPage,
    previousPage,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      // filterTypes,
      initialState: { pageIndex: 0 },
      disableMultiSort: true,
    },
    useFilters,
    useSortBy,
    usePagination
  );

  // fW
  // Excel export implemention
  // function getExcel() {
  //   const config = {
  //     filename: "general-ledger-Q1",
  //     sheet: {
  //       data: [],
  //     },
  //   };

  //   const dataSet = config.sheet.data;

  //   // review with one level nested config
  //   // HEADERS
  //   headerGroups.forEach((headerGroup) => {
  //     const headerRow = [];
  //     if (headerGroup.headers) {
  //       headerGroup.headers.forEach((column) => {
  //         headerRow.push(...getHeader(column));
  //       });
  //     }

  //     dataSet.push(headerRow);
  //   });

  //   // FILTERED ROWS
  //   if (rows.length > 0) {
  //     rows.forEach((row) => {
  //       const dataRow = [];

  //       Object.values(row.values).forEach((value) =>
  //         dataRow.push({
  //           value,
  //           type: typeof value === "number" ? "number" : "string",
  //         })
  //       );

  //       dataSet.push(dataRow);
  //     });
  //   } else {
  //     dataSet.push([
  //       {
  //         value: "No data",
  //         type: "string",
  //       },
  //     ]);
  //   }

  //   return generateExcel(config);
  // }
  console.log(data);
  // Render the UI for your table ..................................................................................................
  return (
    <Paper className={styles.tablePaper}>
      {/* <button onClick={getExcel}>Get Excel</button> */}
      <div style={{ overflowX: "auto" }}>
        <MaUTable
          {...getTableProps()}
          size="small" // dense table sizes(single row size)
          className={styles.table}
        >
          {/* This is filters component: ///////////////////////////////////////////////////////////////////////////*/}
          <TableHead className={styles.TableHead}>
            {headerGroups.map((headerGroup) => (
              <TableRow
                className={styles.TableRow}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => {
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  return (
                    <TableCell
                      className={styles.filtersRow}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      title={null}
                    >
                      {column.render("Header")}
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                      {/* Render the columns filter UI */}
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                      <div>
                        <pre></pre>
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          {/* This is table rows(without filters part) //////////////////////////////////////////////////////////////*/}
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell
                        // style={{
                        //   width: "100%",
                        //   height: "100%",
                        //   backgroundColor: "red",
                        //   borderRadius: "10px",
                        // }}
                        {...cell.getCellProps()}
                        className={styles.excelRow}
                      >
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            {/* A footer can be implemented for here... ///////////////////////////////////////////////////////////////*/}
          </TableFooter>
        </MaUTable>
        {/* 
        Pagination under Table:
      */}
        <div className={styles.pagination}>
          <span>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {"<"}
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {">"}
            </button>{" "}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
          </span>
          <span>
            انتخاب صفحه:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              min={1}
              max={pageOptions.length}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <span>
            صفحه{" "}
            <strong>
              {pageIndex + 1} از {pageOptions.length}
            </strong>{" "}
          </span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50, data.length].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize != data.length
                  ? `${pageSize} سطر در صفحه`
                  : "نمایش کل سطرها"}
                {/* pageSize == data.length? "":{pageSize} سطر در صفحه */}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Paper>
  );
}

export default Table;
