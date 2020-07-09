import { get } from "./http-service";

const getUsers = _ => {
  return get();
};

export { getUsers };
