import Link from "next/link";

import { data } from "autoprefixer"; // ?
import { useContext, useEffect, useState } from "react";
import { BookMarkContext } from "@/BookMarkContext";

// https://newsdata.io/api-key
/* 
kan gå in på länken nedanför för att se APIt
https://newsdata.io/api/1/news?apikey=DIN_NYCKEL&q=pizza
 */

const myAPI_KEY = "pub_382120086c1799d089c0da41a4c9ee4d8a9ec"; // 200 hämtningar per dag?



export async function getStaticProps() {
  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&q=politics` // ska politics vara en variabel så vi kan återanvända denna komponent? eller gör vi nya komponenter för varje kategori? 
  );
  const data = await res.json();

  return {
    props: { 
      news: data.results,
    },

    revalidate: 10,
  };
}

export default function CategoryNews( {news} ) {
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

  function clearBookmarks() {
    dispatch( {
      type: "clear",
    })
  }

  return (
    <div>
      <button onClick={() => (
                clearBookmarks()
                )}>Clear All Bookmarks</button>
      <p>saved articles: 
        {/* // state.bookmarks by itself doesnt work apparently, error */}
       {state.bookmarks.map(bookmark => ( // mappar igenom istället
          <span key={bookmark.id}> {bookmark.id}</span> 
        ))} 
      </p>
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
              <img src={article.image_url} alt="" /> {/* // hittar vad saker heter i det vi fetchade */}
            </li>
          )
        )}
      </ul>
    </div>
  )
}
