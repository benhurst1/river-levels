async function fetchAPI(endpoint) {
  try {
    console.log(`fetching ${endpoint}...`);
    return await fetch(endpoint).then((res) => res.json());
  } catch (error) {
    console.log("error", error);
    return [];
  }
}

module.exports = fetchAPI;
