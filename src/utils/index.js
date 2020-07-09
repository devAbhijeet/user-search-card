const toLower = str => str.toLocaleLowerCase();

const matchString = (userField, userSearch) => {
  return toLower(userField).startsWith(toLower(userSearch));
};

const matchItem = (items, userSearch) => {
  return items.map(toLower).includes(toLower(userSearch));
};

export const getFilteredUser = (store, userSearch) => {
  userSearch = userSearch.trim();
  return store
    .filter(({ address, id, items, name, pincode }, index) => {
      const userAddressMatch = matchString(address, userSearch);
      const userIdMatch = matchString(id, userSearch);
      const userNameMatch = matchString(name, userSearch);
      const userPincodeMatch = matchString(pincode, userSearch);
      const userItemsMatch = matchItem(items, userSearch);

      return (
        userAddressMatch ||
        userIdMatch ||
        userNameMatch ||
        userPincodeMatch ||
        userItemsMatch
      );
    })
    .map(user => ({
      ...user,
      inItems: matchItem(user.items, userSearch)
    }));
};
