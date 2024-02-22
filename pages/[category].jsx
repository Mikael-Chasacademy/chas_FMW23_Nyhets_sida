// pages/[category].js
import Link from "next/link";
import { fetchDataByCategory } from "./api";
import { useContext } from "react";
import { BookMarkContext } from "@/BookMarkContext";

export async function getStaticPaths() {
  // Here you define the categories for which you want to generate dynamic routes
  const categories = ["politics", "technology", "sports"];

  // Generate paths for each category
  const paths = categories.map((category) => ({
    params: { category },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Extract the category parameter from the URL
  const { category } = params;

  // Fetch data based on the category
  const news = await fetchDataByCategory(category);

  return {
    props: { news },
  };
}

export default function CategoryPage({ news }) {
  const { state, dispatch } = useContext(BookMarkContext);

  function addBookmark(article) {
    dispatch({
      type: "add",
      id: article.article_id,
    });
  }

  function deleteBookmark(article) {
    dispatch({
      type: "delete",
      id: article.article_id,
    });
  }

  return (
    <div className="flex flex-col items-center">  
      <div>
        <h1 className="flex justify-center">Category: {news.length > 0 ? news[0].category : "Unknown"}</h1>
        <ul className="grid grid-cols-2 gap-4">
          {news.map((article) => (
            <li key={article.article_id}>
             
              <Link href={`/article/${article.article_id}`}>
                <h2>{article.title}</h2>
              </Link>
              <img className="w-full" src={article.image_url} alt="" />
               <button className="bookmark-btn" onClick={() => addBookmark(article)}>Add Bookmark</button>{" "}
              <button className="bookmark-btn" onClick={() => deleteBookmark(article)}>
                Delete Bookmark
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
