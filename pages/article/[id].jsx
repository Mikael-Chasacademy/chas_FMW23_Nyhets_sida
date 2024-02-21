/*  // variabel kommer heta 'id', drf vi gjorde [id].js ...

 // individuell artikel sida

import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

 const myAPI_KEY = "pub_382120086c1799d089c0da41a4c9ee4d8a9ec";

 export default function Article(props) {
  console.log("Article props", props);

  const [article, setArticle] = useState(null);

  const router = useRouter();
  const { id } = router.query; // id är ifrån [id].jsx? 

  useEffect( () => {
    // hämtar allt igen
    fetch (
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&q=pizza`
    ).then(res => res.json()).then(data => {
      const allArticles = data.results;
      // sparar den specika artikeln
      const article = allArticles.find(article => article.article_id == id)

      setArticle(article);
    }) 

  }, [id]) 

  return (
    <div>
      {article && ( // måste göra detta... detta körs typ en millisekund innan vi hunnit fetcha datan och då blir det error.. article är null då dvs..
        <>
        <h2>{article.title}</h2>
        <img src={article.image_url} alt="" />
        </>
      )}
    </div>
  )
 } */

 const DIN_API_NYCKEL = "pub_38305e955fd48635fc6aea34d9011d6189f5a";

export async function getStaticPaths() {
  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${DIN_API_NYCKEL}&q=pizza`
  );
  const data = await res.json();

  const articles = data.results;

  const paths = articles.map((article) => ({
    params: { id: article.article_id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${DIN_API_NYCKEL}&q=pizza`
  );
  const data = await res.json();

  const articles = data.results;

  const article = articles.find((article) => article.article_id == params.id);

  return {
    props: {
      article,
    },
  };
}

export default function Article({ article }) {
  return (
    <div>
      {article && (
        <>
          <h2>{article.title}</h2>
          <img src={article.image_url} />
        </>
      )}
    </div>
  );
}