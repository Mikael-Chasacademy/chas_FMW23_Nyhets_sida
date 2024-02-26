export async function fetchDataByCategory(category) {
  const myAPI_KEY = "pub_387152f3af6169d536f02f6dbb1b65ca19d8b";
  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=${category}`
  );
  const data = await res.json();
  return data.results;
}
