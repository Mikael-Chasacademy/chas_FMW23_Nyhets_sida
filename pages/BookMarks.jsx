import { BookMarkContext } from "@/BookMarkContext";
import { useContext } from "react";


const myAPI_KEY = "pub_382120086c1799d089c0da41a4c9ee4d8a9ec"; // 200 hämtningar per dag?


export async function getStaticProps() {
  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&q=pizza`
  );
  const data = await res.json();

  return {
    props: {
      news: data.results,
    },
  };
}

export default function BookMarks({ news }) {
  const { state } = useContext(BookMarkContext);

  const filteredArticles = news.filter(article =>
    state.bookmarks.find(bookmark => bookmark.id === article.article_id) // find är bra då den stannar efter den hittat matchande id. Bra ifall vi bookmarkat något flera gånger
  );

  return (
    <div>
      <p>Saved articles:</p>
      {state.bookmarks.map(bookmark => (
        <span key={bookmark.id}> {bookmark.id}</span>
      ))}
      {filteredArticles.map(article => (
        <li key={article.article_id}>
          <h2>{article.title}</h2>
          <img src={article.image_url} alt="" />
        </li>
      ))}
    </div>
  );
}
