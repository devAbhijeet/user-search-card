import React from "react";
import styled from "styled-components";
import CardItem from "./CardItem";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  place-content: left;
  align-items: flex-start;
  font-weight: 200;
`;

const CardList = ({ users, userSearch, iteratorIndex, ...rest }) => {
  return (
    <Container {...rest}>
      {users.map((user, index) => (
        <CardItem
          key={user.id}
          user={user}
          userSearch={userSearch}
          isActive={iteratorIndex === index + 1}
        />
      ))}
    </Container>
  );
};

export default CardList;
