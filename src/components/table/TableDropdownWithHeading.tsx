import { ChangeEvent, useMemo } from "react";
import styled from "styled-components";

import { WHITE_COLOR } from "../../colors";
import { useScreenSize } from "../../hooks/useScreenSize";
import { isSmallScreen } from "../../utils";
import { Select } from "../Select";
import { DYNAMIC_COLUMNS, getColumnLabel } from "./Table.utils";

interface Props {
  onDropdownSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const TitleContent = styled.tr`
  position: absolute;
  display: flex;
  top: 0px;
  padding: 16px;
  background: ${WHITE_COLOR};
  z-index: 1;
`;

const Title = styled.td`
  white-space: nowrap;
  padding: 8px !important;
  border-bottom: none !important;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  margin-right: 58px;
  @media (max-width: 420px) {
    margin-right: 20px;
  }
`;

export const TableDropdownWithHeading = ({ onDropdownSelect }: Props) => {
  const screenSize = useScreenSize();

  const dropdownOptions = useMemo(
    () =>
      DYNAMIC_COLUMNS.map((column) => ({
        key: column.accessor,
        label: getColumnLabel(column.accessor),
      })),
    []
  );

  return (
    <TitleContent>
      <Title>List of keywords</Title>
      {isSmallScreen(screenSize) && (
        <Select onChange={onDropdownSelect} options={dropdownOptions} />
      )}
    </TitleContent>
  );
};
