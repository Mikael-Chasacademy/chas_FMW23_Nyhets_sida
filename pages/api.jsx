export async function fetchDataByCategory(category) {
  const myAPI_KEY = "pub_382120086c1799d089c0da41a4c9ee4d8a9ec";
  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&q=${category}`
  );
  const data = await res.json();
  return data.results;
}