import { CellProps, Renderer } from "react-table";
import styled from "styled-components";
import { KeywordData } from "../../../types";

import { formatNumber } from "../../../utils";

const Container = styled.div``;

export const SearchVolumeCell: Renderer<CellProps<KeywordData>> = ({ row }) => {
  const { original } = row;

  return <Container>{formatNumber(original.search_volume)}</Container>;
};
