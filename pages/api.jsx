export async function fetchDataByCategory(category) {
  const myAPI_KEY = "pub_38716b7bf0044c9fdc848bc0cc7a750ac7c24";
  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&q=${category}`
  );
  const data = await res.json();
  return data.results;
}