import styled from "styled-components";

import { RED_COLOR } from "../colors";

type MessageVariants = "error" | "neutral";

interface Props {
  message: string;
  variant?: MessageVariants;
}

const Container = styled.div<{ variant: MessageVariants }>`
  ${({ variant }) => (variant === "error" ? `color:${RED_COLOR};` : "")};
  padding: 4px;
  margin-bottom: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CustomMessage = ({ message, variant = "neutral" }: Props) => {
  return <Container variant={variant}>{message}</Container>;
};
