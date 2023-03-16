import { HeaderProps, Renderer } from "react-table";
import styled from "styled-components";

import { ReactComponent as Arrows } from "../../assets/arrows.svg";
import { TABLE_HEADER_TEXT_COLOR } from "../../colors";
import { KeywordData } from "../../types";

const Container = styled.div`
  display: flex;
  gap: 4px;
  white-space: nowrap;
`;

const Label = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: ${TABLE_HEADER_TEXT_COLOR};
`;

export const HeadingComponent =
  (title: string): Renderer<HeaderProps<KeywordData>> =>
  () => {
    return (
      <Container>
        <Label>{title}</Label> <Arrows />
      </Container>
    );
  };
