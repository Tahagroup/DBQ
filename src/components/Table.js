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
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import styles from "./Table.module.css";

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

function Table({ columns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    rows,
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
      defaultColumn,
      initialState: { pageIndex: 0 },
      disableMultiSort: true,
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <Paper className={styles.tablePaper}>
      <div style={{ overflowX: "auto" }}>
        <MaUTable {...getTableProps()} size="small" className={styles.table}>
          <TableHead className={styles.TableHead}>
            {headerGroups.map((headerGroup) => (
              <TableRow
                className={styles.TableRow}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => {
                  return (
                    <TableCell
                      className={styles.filtersRow}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      title={null}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
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
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell
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
          <TableFooter></TableFooter>
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
                {pageSize !== data.length
                  ? `${pageSize} سطر در صفحه`
                  : "نمایش کل سطرها"}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Paper>
  );
}

export default Table;
