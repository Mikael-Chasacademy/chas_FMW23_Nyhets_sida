import { BookMarkContext } from "@/BookMarkContext";
import { useContext } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

const myAPI_KEY = "pub_387164ed0851b0cd6e7167139708c0617711e"; // 200 hämtningar per dag?

export async function getStaticProps() {
  // api.jsx funkar bara med staticPaths, dvs att filnamnet är en variabel (som t.ex. [category].jsx och [id].jsx)
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

  const businessRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&q=business`
  );
  const businessData = await businessRes.json();


  return {
    props: {
      news: pizzaData.results,
      tech: techData.results,
      politics: politicsData.results,
      business: businessData.results,
    },
  };
}

export default function BookMarks({ news, tech, politics, business }) {
  //export default function BookMarks({ news }) {
  const { state, dispatch } = useContext(BookMarkContext);

  const combinedData = [...news, ...tech, ...politics, ...business];

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
    <div>
   {/*  <div className={`${inter.className}`}> */}
      {/* <p>Saved articles:</p>
      {state.bookmarks.map((bookmark) => (
        <span key={bookmark.id}> {bookmark.id}</span>
      ))} */}
      <div className="flex justify-center">
        <h1>Saved Articles</h1>
      </div>
      <button className="py-2 px-4 rounded-lg border-none" onClick={() => {
        clearBookmarks()
      }}>Clear All Bookmarks</button>
      <div className="block mt-4" style={{borderTop: "1px solid black"}}>
        <div className="flex">
          <h3 className="bg-black dark:bg-white text-white dark:text-black p-1 m-0">Latest</h3>
        </div>
      </div>
      
      <ul className="grid grid-cols-1 gap-2">
        {/* {filteredArticles.map((article) => (
          // "0.5px solid black"
          <li style={{borderBottom: "0.5px solid black"}} className="flex flex-col gap-2 p-4  " key={article.article_id}> */}
        {filteredArticles.map((article, index) => ( // using index to remove padding at the top
          // "0.5px solid black"
          <li style={{ borderBottom: "0.5px solid black", paddingTop: index === 0 ? 0 : "inherit" }} className="flex flex-col gap-2 p-4" key={article.article_id}>
            <div>
              <button className="text-[10px] py-2 px-4 rounded-lg border-none" onClick={() => deleteBookmark(article)}>
                Delete Bookmark
              </button>
            </div>

            <div className="flex gap-4 justify-start">
              <div className="h-20 w-28 overflow-hidden">
                <img className="h-full w-auto" src={article.image_url} alt="" />
              </div>
                
              <Link className="text-decoration-line:none no-underline" href={`/article/${article.article_id}`}>
                <h2 className="text-decoration-line:none no-underline text-black dark:text-white">{article.title}</h2>
              </Link>
            </div>
            
            {console.log(article.image_url)}

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

    </div>
  );
}
