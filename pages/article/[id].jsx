/*  // variabel kommer heta 'id', drf vi gjorde [id].js ...

 // individuell artikel sida

import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

 const myAPI_KEY = "pub_3871618366750622e0e00dada303407e93ed8";

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

//##################################################################
/* const myAPI_KEY = "pub_38715d0b453471050f31a7ef0c5d7a37e385e";
//Hämtar data
export async function getStaticPaths() {
  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&q=politics`
  );
  const data = await res.json();

  const articles = data.results;

  const paths = articles.map((article) => ({
    params: { id: article.article_id },
  }));

  return { paths, fallback: false };
}
//Hämtar data

//Använder Data
export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&q=politics`
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
//Använder Data

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
} */
//##################################################################

const myAPI_KEY = "pub_3871618366750622e0e00dada303407e93ed8";
//Hämtar data
export async function getStaticPaths() {
  const topRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=top`
  );

  const topData = await topRes.json();

  const topArticles = topData.results;

  const topPaths = topArticles.map((article) => ({
    params: { id: article.article_id.toString() },
  }));

  const politicsRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=politics`
  );

  const politicsData = await politicsRes.json();

  const politicsArticles = politicsData.results;

  const politicsPaths = politicsArticles.map((article) => ({
    params: { id: article.article_id.toString() },
  }));

  const technologyRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=technology`
  );

  const technologyData = await technologyRes.json();

  const technologyArticles = technologyData.results;

  const technologyPaths = technologyArticles.map((article) => ({
    params: { id: article.article_id.toString() },
  }));

  const businessRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=business`
  );

  const businessData = await businessRes.json();

  const businessArticles = businessData.results;

  const businessPaths = businessArticles.map((article) => ({
    params: { id: article.article_id.toString() },
  }));

  return {
    paths: [
      ...topPaths,
      ...politicsPaths,
      ...technologyPaths,
      ...businessPaths,
    ],
    fallback: false,
  };
}
//Hämtar data

//Använder Data
export async function getStaticProps({ params }) {
  const topRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=top`

  );
  const topData = await topRes.json();

  const topArticles = topData.results;

  const topArticle = topArticles.find(
    (article) => article.article_id == params.id
  );

  const politicsRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=politics`

  );
  const politicsData = await politicsRes.json();

  const politicsArticles = politicsData.results;

  const politicsArticle = politicsArticles.find(
    (article) => article.article_id == params.id
  );

  const technologyRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=technology`
  );
  const technologyData = await technologyRes.json();

  const technologyArticles = technologyData.results;

  const technologyArticle = technologyArticles.find(
    (article) => article.article_id == params.id
  );

  const businessRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=us&language=en&category=business`

  );
  const businessData = await businessRes.json();

  const businessArticles = businessData.results;

  const businessArticle = businessArticles.find(
    (article) => article.article_id == params.id
  );

  return {
    props: {
      article:
        topArticle || politicsArticle || technologyArticle || businessArticle, // Use whichever article is found first
    },
  };
}

//Använder Data

export default function Article({ article }) {
  return (
    <div>
      {article && (
        <>
          <h2>{article.title}</h2>
          <img src={article.image_url} alt={article.title} />
          <p>{article.description}</p>
          <h3>{article.content}</h3>
        </>
      )}
    </div>
  );
}
