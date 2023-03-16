import { ChangeEvent } from "react";
import styled from "styled-components";

import { WHITE_COLOR } from "../colors";

interface Props {
  options: { key: string; label: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Container = styled.div`
  border: 1px solid #e8e8e8;
  background-color: ${WHITE_COLOR};
  border-radius: 100px;
  width: 158px;
  height: 36px;
  cursor: pointer;
`;
const StyledSelect = styled.select`
  padding: 9px 0px;
  width: 120px;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 14px;
`;

export const Select = ({ options, onChange }: Props) => {
  return (
    <Container>
      <StyledSelect onChange={onChange}>
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </Container>
  );
};
