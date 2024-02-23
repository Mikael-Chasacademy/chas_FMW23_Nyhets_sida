export async function fetchDataByCategory(category) {
  const myAPI_KEY = "pub_38305e955fd48635fc6aea34d9011d6189f5a";
  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=${category}`
  );
  const data = await res.json();
  return data.results;
}
