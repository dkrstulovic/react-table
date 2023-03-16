import { CellProps, Renderer } from "react-table";
import styled from "styled-components";

import { WHITE_COLOR } from "../../../colors";
import { KeywordData } from "../../../types";
import { getBackgroundColor } from "../../../utils";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Score = styled.div<{ score: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ score }) => getBackgroundColor(score)};
  width: 35px;
  height: 23px;
  color: ${WHITE_COLOR};
  border-radius: 32px;
`;

export const OverallScoreCell: Renderer<CellProps<KeywordData>> = ({ row }) => {
  const { original } = row;
  const score = original.overall_score;

  return (
    <Container>
      <Score score={score}>{score}</Score>
    </Container>
  );
};
