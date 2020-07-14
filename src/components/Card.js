import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import users from "../data/users";
import { getUsers } from "../service/user-service";
import { getFilteredUser, scrollIntoView } from "../utils/index";
import Input from "./Input";
import CardList from "./CardList";

const Container = styled.div`
  width: 100%;
  border: 1px solid #b2b2b2;
`;

const NoData = styled.div`
  width: 100%;
  display: flex;
  place-content: center;
  align-items: center;
  font-weight: 200;
  height: 100px;
  color: #aaa;
  font-style: italic;
  & div {
    padding: 10px;
  }
`;

const Card = () => {
  const [usersStore, setUserStore] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [tempUserSearch, setTempUserSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [iteratorIndex, setIteratorIndex] = useState(0);
  const [withList, setWithList] = useState(true);
  const [withTempUserSearch, setWithTempUserSearch] = useState(false);
  let cardItemRefs = [];
  let cardListContainerRef = useRef(null);

  const handleDocumentClick = e => {
    e.stopPropagation();
    setWithList(e.target.classList.contains("persist"));
  };

  const handleMouseMoveOnDom = e => {
    if (!e.target.classList.contains("card-item")) {
      setWithTempUserSearch(false);
      setIteratorIndex(0);
    } else {
      return false;
    }
  };

  useEffect(() => {
    getUsers()
      .then(u => setUserStore(u.length ? u : users))
      .catch(e => setUserStore(users));
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("mousemove", handleMouseMoveOnDom);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("mousemove", handleMouseMoveOnDom);
    };
  }, []);

  useEffect(() => {
    if (userSearch) {
      const result = getFilteredUser(usersStore, userSearch);
      setFilteredUsers(result);
      setIteratorIndex(0);
      setTempUserSearch("");
      setWithTempUserSearch(false);
    } else {
      setTempUserSearch("");
      setWithTempUserSearch(false);
      setIteratorIndex(0);
      setWithList(false);
      setFilteredUsers([]);
    }
    cardItemRefs = [];
  }, [userSearch]);

  useEffect(() => {
    setIteratorIndex(0);
    setWithList(true);
  }, [filteredUsers]);

  useEffect(() => {
    if (withTempUserSearch) {
      if (iteratorIndex === 0) {
        setTempUserSearch(userSearch);
      } else {
        setTempUserSearch(filteredUsers[iteratorIndex - 1].name);
      }
    }
  }, [iteratorIndex]);

  const handleInput = e => {
    e.persist();
    setTempUserSearch("");
    setUserSearch(e.target.value);
  };

  const handleKeyUp = e => {
    e.persist();
    const whichKey = +e.which;
    if (whichKey === 38) {
      let nextIndex = iteratorIndex;
      --nextIndex;
      nextIndex = nextIndex < 0 ? filteredUsers.length : nextIndex;
      setIteratorIndex(nextIndex);
      setWithTempUserSearch(true);
      scrollIntoView(cardListContainerRef, cardItemRefs, nextIndex, true);
    }
    if (whichKey === 40) {
      let nextIndex = iteratorIndex;
      nextIndex = Math.abs(++nextIndex % (filteredUsers.length + 1));
      setIteratorIndex(nextIndex);
      setWithTempUserSearch(true);
      scrollIntoView(cardListContainerRef, cardItemRefs, nextIndex, true);
    }
    if (whichKey === 13) {
      setWithList(false);
    }
  };

  const handleMouseMove = (e, index) => {
    e.persist();
    if (e && e.target && e.target.classList.contains("card-item")) {
      setWithTempUserSearch(false);
      setIteratorIndex(+index + 1);
      scrollIntoView(cardListContainerRef, cardItemRefs, +index + 1, false);
    }
  };

  const handleClick = e => {
    e.persist();
    setWithList(false);
    setWithTempUserSearch(true);
    setIteratorIndex(iteratorIndex);
  };

  const setChildRef = ref => {
    cardItemRefs.push(ref);
  };

  const setParentRef = ref => {
    cardListContainerRef.current = ref;
  };

  return (
    <Container className="persist" onKeyUp={handleKeyUp}>
      <Input
        onInput={handleInput}
        placeholder="Search users by ID, address, name, items"
        value={tempUserSearch ? tempUserSearch : userSearch}
      />
      {filteredUsers && filteredUsers.length > 0 && withList && (
        <CardList
          setChildRef={setChildRef}
          setParentRef={setParentRef}
          users={filteredUsers}
          userSearch={userSearch}
          handleMouseMove={handleMouseMove}
          handleClick={handleClick}
          iteratorIndex={iteratorIndex}
        />
      )}
      {userSearch !== "" && filteredUsers && filteredUsers.length === 0 && (
        <NoData>
          <div>{`Search term "${userSearch}" not found`}</div>
        </NoData>
      )}
    </Container>
  );
};

export default Card;
