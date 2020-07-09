import React, { useState, useEffect } from "react";
import styled from "styled-components";
import users from "../data/users";
import { getUsers } from "../service/user-service";
import { getFilteredUser } from "../utils/index";
import Input from "./Input";
import CardList from "./CardList";

const Container = styled.div`
  width: 100%;
`;

const Card = () => {
  const [usersStore, setUserStore] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [tempUserSearch, setTempUserSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [iteratorIndex, setIteratorIndex] = useState(0);

  useEffect(() => {
    getUsers().then(u => setUserStore(u.length ? u : users));
  }, []);

  useEffect(() => {
    if (userSearch) {
      const result = getFilteredUser(usersStore, userSearch);
      setFilteredUsers(result);
    } else {
      setFilteredUsers([]);
    }
  }, [userSearch]);

  useEffect(() => {
    setIteratorIndex(0);
  }, [filteredUsers]);

  useEffect(() => {
    console.log("iteratorIndex ", iteratorIndex);
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

  const handleInputChange = _ => console.log("Changed");

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
  };

  return (
    <Container onKeyUp={handleKeyUp}>
      <Input
        onChange={handleInputChange}
        onInput={handleInput}
        placeholder="Search users by ID, address, name, items"
        value={tempUserSearch ? tempUserSearch : userSearch}
      />
      {filteredUsers && filteredUsers.length > 0 && (
        <CardList
          users={filteredUsers}
          userSearch={userSearch}
          iteratorIndex={iteratorIndex}
        />
      )}
    </Container>
  );
};

export default Card;
