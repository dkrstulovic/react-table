import styled from "styled-components";

import { CustomMessage } from "../components/CustomMessage";
import { KeywordsTable } from "../components/table/Table";
import { useData } from "../hooks/useData";

const Container = styled.div``;
const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 120px;
  font-size: 40px;
`;

export const KeywordsPage = () => {
  const [data, error, isLoading] = useData();

  if (error)
    return (
      <MessageContainer>
        <CustomMessage message={error} variant="error" />
      </MessageContainer>
    );

  if (!data || isLoading)
    return (
      <MessageContainer>
        <CustomMessage message="Loading...." />
      </MessageContainer>
    );

  return (
    <Container>
      <KeywordsTable data={data} />
    </Container>
  );
};
