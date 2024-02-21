import { BookMarkContext } from "@/BookMarkContext";
import { useContext } from "react";
import Link from "next/link";
import { fetchDataByCategory } from "./api";
import Image from "next/image";

const myAPI_KEY = "pub_38305e955fd48635fc6aea34d9011d6189f5a"; // 200 hämtningar per dag?

/* export async function getStaticPaths() {
  const categories = ["politics", "technology", "pizza"]; // Add more categories as needed
  const paths = categories.map(category => ({ params: { category: category } }));
  return { paths, fallback: false };
} */

export async function getStaticProps() {
  const pizzaRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&q=pizza`
  );
  const pizzaData = await pizzaRes.json();

  const techRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&q=technology`
  );
  const techData = await techRes.json();

  const politicsRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&q=politics`
  );
  const politicsData = await politicsRes.json();

  /* const { category } = params;
  const news = await fetchDataByCategory(category);
  return {
    props: { news },
    revalidate: 10,
  };
   */
  return {
    props: {
      news: pizzaData.results,
      tech: techData.results,
      politics: politicsData.results,
    },
  };
}

export default function BookMarks({ news, tech, politics }) {
  //export default function BookMarks({ news }) {
  const { state, dispatch } = useContext(BookMarkContext);

  const combinedData = [...news, ...tech, ...politics];

  const filteredArticles = combinedData.filter(
    (article) =>
      state.bookmarks.find((bookmark) => bookmark.id === article.article_id) // find är bra då den stannar efter den hittat matchande id. Bra ifall vi bookmarkat något flera gånger
  );
  /* const filteredArticles = news.filter(article =>
    state.bookmarks.find(bookmark => bookmark.id === article.article_id) // find är bra då den stannar efter den hittat matchande id. Bra ifall vi bookmarkat något flera gånger
  ); */

  function deleteBookmark(article) {
    dispatch({
      type: "delete",
      id: article.article_id,
    });
  }

  function clearBookmarks() {
    dispatch({
      type: "clear"
    })
  }

  // Define a custom loader function for external images
  /*   const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  }; */

  return (
    <div className="">
      <p>Saved articles:</p>
      {state.bookmarks.map((bookmark) => (
        <span key={bookmark.id}> {bookmark.id}</span>
      ))}
      <button onClick={() => {
        clearBookmarks()
      }}>Clear All Bookmarks</button>
      <ul className="grid grid-cols-2 gap-4">
        {filteredArticles.map((article) => (
          <li key={article.article_id}>
            <button onClick={() => deleteBookmark(article)}>
              Delete Bookmark
            </button>
            <Link href={`/article/${article.article_id}`}>
              <h2>{article.title}</h2>
            </Link>
            {console.log(article.image_url)}
            <img src={article.image_url} alt="" />
            {/* <Image 
          loader={myLoader}
          src={article.image_url} 
          alt={article.title} 
          width={400} 
          height={400} 
        /> */}
          </li>
        ))}
      </ul>

      {/* {"hallå"} */}
    </div>
  );
}

// hej