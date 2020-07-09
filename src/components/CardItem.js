import React, { forwardRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  border-bottom: 1px solid #b2b2b2;
  border-top: transparent;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: ${props => (props.isActive ? "#efefef" : "")};
  &:hover {
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 10px;
  padding-right: 10px;
  width: 92%;
`;

const Id = styled.div`
  font-weight: bold;
  color: #111;
  & span {
    color: #06ddf3f5;
  }
`;

const Name = styled.div`
  font-style: italic;
  color: #afafaf;
  margin-top: 2px;
  font-size: 12px;
  & span {
    color: #06ddf3f5;
  }
`;

const Break = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  border-top: 1px solid #efefef;
  width: 100%;
`;

const Info = styled.div`
  color: #aeaeae;
  font-size: 11px;
  position: relative;
  & span {
    margin-left: 10px;
  }
  &::before {
    position: absolute;
    content: "";
    margin-right: 10px;
    top: 42%;
    border-radius: 100%;
    background: #06ddf3f5;
    height: 5px;
    width: 5px;
  }
`;

const Address = styled.div`
  color: #afafaf;
  margin-top: 5px;
  font-size: 13px;
  & span {
    color: #06ddf3f5;
  }
`;

const withHTML = (str, regex) => ({
  __html: str.replace(regex, str => `<span>${str}</span>`)
});

const CardItem = ({ user, userSearch, index, isActive, ...rest }, ref) => {
  const regex = new RegExp(userSearch, "ig");
  return (
    <Container ref={ref} isActive={isActive} {...rest}>
      <Content>
        <Id dangerouslySetInnerHTML={withHTML(user.id, regex)} />
        <Name dangerouslySetInnerHTML={withHTML(user.name, regex)} />
        {user.inItems ? (
          <>
            <Break />
            <Info>
              <span>{`"${userSearch}" found in items`}</span>
            </Info>
            <Break />
          </>
        ) : null}
        <Address dangerouslySetInnerHTML={withHTML(user.address, regex)} />
      </Content>
    </Container>
  );
};

export default forwardRef(CardItem);
