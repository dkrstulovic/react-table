import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useSortBy, Column } from "react-table";

import { KeywordData } from "../../types";
import { KeywordsCell } from "./cells/KeywordsCell";
import { HeadingComponent } from "./HeadingComponent";
import { isSmallScreen, LOCAL_STORAGE_KEY } from "../../utils";
import { Paginaton } from "./Pagination";
import { useScreenSize } from "../../hooks/useScreenSize";
import { TableDropdownWithHeading } from "./TableDropdownWithHeading";
import { TableContainer } from "./Table.styles";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  prepareColumns,
} from "./Table.utils";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface Props {
  columns: Column<KeywordData>[];
  data: KeywordData[];
  onDropdownSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const Table = ({ columns, data, onDropdownSelect }: Props) => {
  const { getLocalValue, setLocalValue } = useLocalStorage();

  const config = getLocalValue(LOCAL_STORAGE_KEY);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: config?.pageIndex || DEFAULT_PAGE_INDEX - 1,
        pageSize: config?.pageSize || DEFAULT_PAGE_SIZE,
        sortBy: config?.sortBy
          ? [
              {
                id: config.sortBy,
                desc: config?.desc,
              },
            ]
          : [],
      },
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    if (sortBy?.length) {
      const [sortByDetails] = sortBy;

      const currentConfig = getLocalValue(LOCAL_STORAGE_KEY);
      if (currentConfig) {
        setLocalValue(LOCAL_STORAGE_KEY, {
          ...currentConfig,
          sortBy: sortByDetails.id,
          desc: sortByDetails.desc,
        });
      } else {
        setLocalValue(LOCAL_STORAGE_KEY, {
          sortBy: sortByDetails.id,
          desc: sortByDetails.desc,
        });
      }
    } else {
      const currentConfig = getLocalValue(LOCAL_STORAGE_KEY);
      if (currentConfig) {
        setLocalValue(LOCAL_STORAGE_KEY, {
          ...currentConfig,
          sortBy: undefined,
          desc: undefined,
        });
      }
    }
  }, [sortBy]);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          <TableDropdownWithHeading onDropdownSelect={onDropdownSelect} />
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Paginaton
        setPageSize={setPageSize}
        pageSize={pageSize}
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
      />
    </>
  );
};

export const KeywordsTable = ({ data }: { data: KeywordData[] }) => {
  const { getLocalValue, setLocalValue } = useLocalStorage();
  const config = getLocalValue(LOCAL_STORAGE_KEY);
  const [selectedColumn, setSelectedColumn] = useState<string>(
    config?.selectedColumn || "search_volume"
  );

  useEffect(() => {
    const currentConfig = getLocalValue(LOCAL_STORAGE_KEY);
    if (currentConfig) {
      setLocalValue(LOCAL_STORAGE_KEY, { ...currentConfig, selectedColumn });
    } else {
      setLocalValue(LOCAL_STORAGE_KEY, {
        selectedColumn,
      });
    }
  }, [selectedColumn]);

  const isMobileView = isSmallScreen(useScreenSize());

  const columns = useMemo(
    () => [
      {
        Header: HeadingComponent("Keyword"),
        accessor: "keyword",
        Cell: KeywordsCell,
      } as const,
      ...prepareColumns(isMobileView, selectedColumn),
    ],
    [selectedColumn, isMobileView]
  );

  return (
    <TableContainer>
      <Table
        columns={columns}
        data={data}
        onDropdownSelect={(e: ChangeEvent<HTMLSelectElement>) =>
          setSelectedColumn(e.target.value)
        }
      />
    </TableContainer>
  );
};
