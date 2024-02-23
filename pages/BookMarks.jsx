import { BookMarkContext } from "@/BookMarkContext";
import { useContext } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { fetchDataByCategory } from "./api";
import Subscribe from "@/components/Subscribe";


const inter = Inter({ subsets: ["latin"] });

const myAPI_KEY = "pub_38716b7bf0044c9fdc848bc0cc7a750ac7c24"; // 200 hämtningar per dag?

/* export async function getStaticPaths() {
  const categories = ["politics", "technology", "pizza"]; // Add more categories as needed
  const paths = categories.map(category => ({ params: { category: category } }));
  return { paths, fallback: false };
} */

export async function getStaticProps() {
 
  const [topNews, politicsNews, techNews, businessNews] = await Promise.all([
    fetchDataByCategory("top"),
    fetchDataByCategory("politics"),
    fetchDataByCategory("technology"),
    fetchDataByCategory("business"),
  ]);


  return {
    props: {
      topNews: topNews,
      politicsNews: politicsNews,
      techNews: techNews,
      businessNews: businessNews,
    },
    revalidate: 10,
  };
}

export default function BookMarks({ techNews, politicsNews, businessNews, topNews }) {
  const { state, dispatch } = useContext(BookMarkContext);

  const combinedData = [...techNews, ...politicsNews, ...businessNews, ...topNews];

  // filter the articles to those we 'find'
  const filteredArticles = combinedData.filter(
    (article) => 
      state.bookmarks.find((bookmark) => bookmark.id === article.article_id) // find stops at the first match... But React.StrictMode etc can still lead to duplicates(due to running 2 times for testing purposes) so we remove duplicates after this...
  );

  console.log(filteredArticles);

  // remove duplicates, it occurs even though we use 'find' above(?):
  let articlesNoDuplicates = [];

  for (let i = 0; i < filteredArticles.length; i++) {
    let isDuplicate = false;
    for (let j = i + 1; j < filteredArticles.length; j++) {
      if (filteredArticles[i].article_id === filteredArticles[j].article_id) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) {
      articlesNoDuplicates = [...articlesNoDuplicates, filteredArticles[i]];
    }
  }

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

  return (
    <div >
   {/*  <div className={`${inter.className}`}> */}
      {/* <p>Saved articles:</p>
      {state.bookmarks.map((bookmark) => (
        <span key={bookmark.id}> {bookmark.id}</span>
      ))} */}
      <div className="flex justify-center">
      <h1>Saved Articles</h1>
      </div>
      <button className="py-2 px-4 rounded-lg border-none bg-[#1A1C21] text-white font-bold dark:bg-white dark:text-[#1A1C21] hover:cursor-pointer" onClick={() => {
        clearBookmarks()
      }}>Clear All Bookmarks</button>
      <div className="block mt-4 border-t-1 border-b-0 border-l-0 border-r-0 border-solid border-[#1A1C21] dark:border-[#EEEFF2]">
        <div className="flex">
          <h3 className="bg-[#1A1C21] dark:bg-[#EEEFF2] text-[#EEEFF2] dark:text-[#1A1C21] p-1 m-0">Saved</h3>
        </div>
      </div>
      
      {articlesNoDuplicates.length > 0 ? (<ul className="grid grid-cols-1 gap-2">
        {/* {filteredArticles.map((article) => (
          // "0.5px solid black"
          <li style={{borderBottom: "0.5px solid black"}} className="flex flex-col gap-2 p-4  " key={article.article_id}> */}
        {articlesNoDuplicates.map((article, index) => ( // using index to remove padding at the top
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

          </li>
        ))}
      </ul>): (
        <div className="flex justify-center mt-20"> {/* mt-20 is the same as Subscribe section */}
          <h2>You have no saved articles</h2>
        </div>
      )}


     <Subscribe/>
    </div>
  );
}
