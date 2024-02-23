export async function fetchDataByCategory(category) {
  const myAPI_KEY = "pub_387160e3aa10f141258ac989c4095bffb6ec6";
  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&q=${category}`
  );
  const data = await res.json();
  return data.results;
}