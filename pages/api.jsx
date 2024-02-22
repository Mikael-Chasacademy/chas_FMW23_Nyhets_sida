export async function fetchDataByCategory(category) {
  const myAPI_KEY = "pub_387164ed0851b0cd6e7167139708c0617711e";
  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&q=${category}`
  );
  const data = await res.json();
  return data.results;
}