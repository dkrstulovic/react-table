import { CellProps, Renderer } from "react-table";
import styled from "styled-components";

import { ReactComponent as FireIcon } from "../../../assets/fire.svg";
import { KeywordData } from "../../../types";

const Container = styled.div`
  text-align: left;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const KeywordsCell: Renderer<CellProps<KeywordData>> = ({ row }) => {
  const { original } = row;

  return (
    <Container>
      {original.keyword}{" "}
      {original.isTrending && <FireIcon data-testid="fire-icon" />}
    </Container>
  );
};
