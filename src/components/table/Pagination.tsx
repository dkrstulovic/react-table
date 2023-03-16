import { useEffect } from "react";
import styled, { css } from "styled-components";

import { GRAY_LIGHT, WHITE_COLOR } from "../../colors";
import { LOCAL_STORAGE_KEY } from "../../utils";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface Props {
  setPageSize: (number: number) => void;
  pageSize: number;
  gotoPage: (number: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  pageIndex: number;
  pageOptions: number[];
}

const UIControlStyle = css`
  padding: 8px;
  background-color: ${WHITE_COLOR};
  border: 1px solid ${GRAY_LIGHT};
  border-radius: 5px;
  margin-left: 8px;
  cursor: pointer;
  outline: none;
`;

const StyledButton = styled.button`
  ${UIControlStyle}

  &:hover:not(:disabled) {
    background-color: ${GRAY_LIGHT};
    color: ${WHITE_COLOR};
    border-color: ${GRAY_LIGHT};
  }

  &:disabled {
    color: ${GRAY_LIGHT};
    cursor: not-allowed;
  }
`;

const StyledSelect = styled.select`
  ${UIControlStyle}
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;

  span {
    margin-inline: 8px;
  }
`;

export const Paginaton = ({
  setPageSize,
  pageSize,
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
  pageOptions,
}: Props) => {
  const { getLocalValue, setLocalValue } = useLocalStorage();

  useEffect(() => {
    const currentConfig = getLocalValue(LOCAL_STORAGE_KEY);
    if (currentConfig) {
      setLocalValue(LOCAL_STORAGE_KEY, {
        ...currentConfig,
        pageIndex,
        pageSize,
      });
    } else {
      setLocalValue(LOCAL_STORAGE_KEY, {
        pageIndex: pageIndex,
        pageSize: pageSize,
      });
    }
  }, [pageIndex, pageSize]);

  return (
    <PaginationContainer>
      <StyledButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {"<<"}
      </StyledButton>
      <StyledButton onClick={() => previousPage()} disabled={!canPreviousPage}>
        {"<"}
      </StyledButton>
      <span>
        Page{" "}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>
      </span>
      <StyledButton onClick={() => nextPage()} disabled={!canNextPage}>
        {">"}
      </StyledButton>
      <StyledButton
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        {">>"}
      </StyledButton>
      <StyledSelect
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[25, 50, 75, 100].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </StyledSelect>
    </PaginationContainer>
  );
};
