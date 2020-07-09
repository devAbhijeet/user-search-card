import React, { useState } from "react";
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

const CardList = ({
  users,
  userSearch,
  handleMouseEnter,
  handleClick,
  iteratorIndex,
  ...rest
}) => {
  return (
    <Container className="persist" {...rest}>
      {users.map((user, index) => (
        <CardItem
          key={user.id}
          user={user}
          userSearch={userSearch}
          index={index}
          onMouseEnter={e => handleMouseEnter(e, index)}
          onClick={handleClick}
          isActive={iteratorIndex === index + 1}
        />
      ))}
    </Container>
  );
};

export default CardList;
