import React, { useRef } from "react";
import styled from "styled-components";
import CardItem from "./CardItem";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  place-content: left;
  align-items: flex-start;
  font-weight: 200;
  height: fit-content;
  max-height: 295px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const CardList = ({
  users,
  userSearch,
  handleMouseMove,
  handleClick,
  iteratorIndex,
  setChildRef,
  setParentRef,
  ...rest
}) => {
  return (
    <Container ref={setParentRef} className="persist" {...rest}>
      {users.map((user, index) => (
        <CardItem
          key={user.id}
          ref={setChildRef}
          user={user}
          userSearch={userSearch}
          index={index}
          onMouseEnter={e => handleMouseMove(e, index)}
          onClick={handleClick}
          isActive={iteratorIndex === index + 1}
        />
      ))}
    </Container>
  );
};

export default CardList;
