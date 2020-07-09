import React, { useState, useEffect } from "react";
import styled from "styled-components";
import users from "../data/users";
import { getUsers } from "../service/user-service";
import { getFilteredUser } from "../utils/index";
import Input from "./Input";
import CardList from "./CardList";

const Container = styled.div`
  width: 100%;
  border: 1px solid #b2b2b2;
`;

const Card = () => {
  const [usersStore, setUserStore] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [tempUserSearch, setTempUserSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [iteratorIndex, setIteratorIndex] = useState(0);
  const [withList, setWithList] = useState(true);

  const parentHasPersist = e => {
    return e && e.target && e.target.parentNode && e.target.parentNode.classList
      ? e.target.parentNode.classList.contains("persist")
      : false;
  };

  const handleDocumentClick = e => {
    e.stopPropagation();
    setWithList(e.target.classList.contains("persist"));
  };

  useEffect(() => {
    getUsers().then(u => setUserStore(u.length ? u : users));
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    if (userSearch) {
      const result = getFilteredUser(usersStore, userSearch);
      setFilteredUsers(result);
    } else {
      setTempUserSearch("");
      setIteratorIndex(0);
      setWithList(false);
      setFilteredUsers([]);
    }
  }, [userSearch]);

  useEffect(() => {
    setIteratorIndex(0);
    setWithList(true);
  }, [filteredUsers]);

  useEffect(() => {
    if (iteratorIndex === 0) {
      setTempUserSearch(userSearch);
    } else {
      setTempUserSearch(filteredUsers[iteratorIndex - 1].name);
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
      setIteratorIndex(nextIndex < 0 ? filteredUsers.length : nextIndex);
    }
    if (whichKey === 40) {
      let nextIndex = iteratorIndex;
      nextIndex = Math.abs(++nextIndex % (filteredUsers.length + 1));
      setIteratorIndex(nextIndex);
    }
    if (whichKey === 13) {
      setWithList(false);
      setIteratorIndex(iteratorIndex);
    }
  };

  const handleMouseEnter = (e, index) => {
    e.persist();
    setIteratorIndex(+index + 1);
  };

  const handleClick = e => {
    e.persist();
    setWithList(false);
    setIteratorIndex(iteratorIndex);
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
          users={filteredUsers}
          userSearch={userSearch}
          handleMouseEnter={handleMouseEnter}
          handleClick={handleClick}
          iteratorIndex={iteratorIndex}
        />
      )}
    </Container>
  );
};

export default Card;
