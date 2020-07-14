const log = (target, container, nextIndex) => {
  const { offsetTop, clientHeight } = target;
  const eleBottom = offsetTop + clientHeight;
  const {
    scrollTop,
    clientHeight: containerClientHeight,
    scrollHeight
  } = container;
  const containerBottom = scrollTop + containerClientHeight;
  console.groupCollapsed();
  console.log("offsetTop ", offsetTop);
  console.log("clientHeight ", clientHeight);
  console.log("eleBottom ", eleBottom);
  console.log("scrollTop ", scrollTop);
  console.log("containerClientHeight ", containerClientHeight);
  console.log("containerBottom ", containerBottom);
  console.log("nextIndex ", nextIndex);
  console.log("scrollHeight ", scrollHeight);
  console.groupEnd();
};

export const scrollIntoView = (
  cardListContainerRef,
  cardItemRefs,
  nextIndex,
  isKeyBoardScroll
) => {
  nextIndex--;
  let target = cardItemRefs[nextIndex];
  let container = cardListContainerRef.current;
  if (target && container) {
    const { offsetTop, clientHeight } = target;
    const eleBottom = offsetTop + clientHeight;
    const { scrollTop, clientHeight: containerClientHeight } = container;
    const containerBottom = scrollTop + containerClientHeight;
    if (!isKeyBoardScroll) {
      if (
        !(
          (eleBottom < containerBottom ||
            eleBottom + 25 < containerBottom + clientHeight) &&
          nextIndex * clientHeight + 10 >= scrollTop
        )
      ) {
        log(target, container, nextIndex);
        console.log("not in view port");
        // container.scrollTop = scrollTop - (scrollTop % clientHeight);
        // container.scrollTop = scrollTop + (scrollTop % clientHeight);
      } else {
        log(target, container, nextIndex);
        console.log("in view port");
      }
    } else {
      if (offsetTop < scrollTop) {
        container.scrollTop -= scrollTop;
      } else if (eleBottom > containerBottom) {
        container.scrollTop += eleBottom - containerBottom;
      }
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
