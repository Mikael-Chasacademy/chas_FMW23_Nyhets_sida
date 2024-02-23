export async function fetchDataByCategory(category) {
  const myAPI_KEY = "pub_38212009a3be96a451d7fcf4ba5478438a924";
  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=${category}`
  );
  const data = await res.json();
  return data.results;
}
