const API_URL = `https://www.mocky.io/v2/5ba8efb23100007200c2750c/`;

const get = async () => {
  const FETCH_URL = API_URL;
  let response = await fetch(FETCH_URL, {
    method: "GET",
    mode: "cors",
    cache: "default",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response.json();
};

export { get };
