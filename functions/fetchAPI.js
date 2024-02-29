export async function fetchAPI(endpoint) {
  try {
    console.log(`fetching ${endpoint}...`);
    const res = await fetch(endpoint);
    console.log("fetched", res.status);
    return res.json();
  } catch (error) {
    console.log("error", error);
    return [];
  }
}
