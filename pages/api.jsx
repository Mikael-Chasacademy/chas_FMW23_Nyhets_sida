export async function fetchDataByCategory(category) {
  const myAPI_KEY = "pub_3871618366750622e0e00dada303407e93ed8";
  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=${category}`
  );
  const data = await res.json();
  return data.results;
}
