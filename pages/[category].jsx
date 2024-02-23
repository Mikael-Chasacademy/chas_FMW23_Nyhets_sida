import Link from "next/link";
import { fetchDataByCategory } from "./api";
import { useContext, useState } from "react";
import { BookMarkContext } from "@/BookMarkContext";

export async function getStaticPaths() {
  // Här definierar du de kategorier för vilka du vill generera dynamiska rutter
  const categories = ["politics", "technology", "sports"];

  // Generera sökvägar för varje kategori
  const paths = categories.map((category) => ({
    params: { category },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Extrahera kategori parametern från URL:en
  const { category } = params;

  // Hämta data baserat på kategorin
  const news = await fetchDataByCategory(category);

  return {
    props: { news },
  };
}

export default function CategoryPage({ news }) {
  const { state, dispatch } = useContext(BookMarkContext);
  const [bookmarkText, setBookmarkText] = useState("");

  function addBookmark(article) {
    dispatch({
      type: "add",
      id: article.article_id,
    });
    setBookmarkText("Bookmark added to Bookmarks");
    setTimeout(() => setBookmarkText(""), 2000); // Fade out after 2 seconds
  }

  function deleteBookmark(article) {
    dispatch({
      type: "delete",
      id: article.article_id,
    });
    setBookmarkText("Bookmark removed from Bookmarks");
    setTimeout(() => setBookmarkText(""), 2000); // Fade out after 2 seconds
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        <h1 className="flex justify-center">
          Category: {news.length > 0 ? news[0].category : "Unknown"} News
        </h1>
        <ul className="article-list grid grid-cols-2 gap-4">
          {news.map((article, index) => (
            <li
              key={article.article_id}
              className={index === 0 ? "full-width" : ""}
            >
              <Link
                className="text-black"
                href={`/article/${article.article_id}`}
              >
                <h2>{article.title}</h2>
              </Link>
              <img className="w-full" src={article.image_url} alt="" />
              <div className="btn-container">
                <div className="bookmark-btn-wrapper">
                  <button
                    className="bookmark-btn"
                    onClick={() => addBookmark(article)}
                  >
                    <span className="material-symbols-outlined">
                      bookmark_added
                    </span>{" "}
                    &nbsp; Add Bookmark
                  </button>
                </div>
                <div className="bookmark-btn-wrapper">
                  <button
                    className="bookmark-btn"
                    onClick={() => deleteBookmark(article)}
                  >
                    <span className="material-symbols-outlined">
                      bookmark_remove
                    </span>{" "}
                    &nbsp; Remove Bookmark
                  </button>
                </div>
              </div>
              {bookmarkText && (
                <span className="fade-out-text">{bookmarkText}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

