export async function fetchDataByCategory(category) {
  const myAPI_KEY = "pub_38715851a375bfab2b1c010cd896252eb7e5b";
  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=${category}`
  );
  const data = await res.json();
  return data.results;
}
