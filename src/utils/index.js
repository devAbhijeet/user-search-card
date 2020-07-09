export const scrollIntoView = (
  cardListContainerRef,
  cardItemRefs,
  nextIndex
) => {
  nextIndex--;
  let target = cardItemRefs[nextIndex];
  let container = cardListContainerRef.current;
  if (target && container) {
    const { offsetTop, clientHeight } = target;
    const eleBottom = offsetTop + clientHeight;
    const { scrollTop, clientHeight: containerClientHeight } = container;
    const containerBottom = scrollTop + containerClientHeight;
    if (offsetTop < scrollTop) {
      container.scrollTop -= scrollTop;
    } else if (eleBottom > containerBottom) {
      container.scrollTop += eleBottom - containerBottom;
    }
  }
};

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
