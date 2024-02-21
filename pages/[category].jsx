// pages/[category].js
import Link from "next/link";
import { fetchDataByCategory } from "./api";
import { useContext } from "react";
import { BookMarkContext } from "@/BookMarkContext";

export async function getStaticPaths() {
  // Here you define the categories for which you want to generate dynamic routes
  const categories = ["politics", "technology", "sports"];
  
  // Generate paths for each category
  const paths = categories.map(category => ({
    params: { category }
  }));
  
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Extract the category parameter from the URL
  const { category } = params;
  
  // Fetch data based on the category
  const news = await fetchDataByCategory(category);
  
  return {
    props: { news }
  };
}

export default function CategoryPage({ news }) {
  const { state, dispatch } = useContext(BookMarkContext);

  function addBookmark(article) {
    dispatch( {
      type: "add",
      id: article.article_id,
    })
  }

  function deleteBookmark(article) {
    dispatch( {
      type: "delete",
      id: article.article_id,
    })
  }

  return (
    <div>
      {/* <h1>Category: {news.length > 0 ? news[0].category : "Unknown"}</h1> */}
      <ul>
        {news.map(article => ( 
            <li key={article.article_id}  >
              <button onClick={() => (
                addBookmark(article)
                )}>Add Bookmark</button> {/* // skickar hela article objektet ifall vi vill komma åt mer än bara id sen? */}
                <button onClick={() => (
                deleteBookmark(article)
                )}>Delete Bookmark</button>
              <Link href={`/article/${article.article_id}`}><h2>{article.title}</h2></Link>
              <img src={article.image_url} alt="" />
            </li>
          )
        )}
      </ul>
    </div>
  );
}
