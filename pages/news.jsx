import Link from "next/link";

const myAPI_KEY = "pub_3826420aa772faa6db69797ad33ddda8dd802";
const myAPI_KEY2 = "pub_38735da2aedac9ef5783c66faf622ffdeaa00";

export async function getStaticProps() {
  try {
    const topRes = await fetch(
      `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=se&language=sv&category=top`
    );
    const topData = await topRes.json();

    const politicsRes = await fetch(
      `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=se&language=sv&category=politics`
    );
    const politicsData = await politicsRes.json();

    const technologyRes = await fetch(
      `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=se&language=sv&category=technology`
    );
    const technologyData = await technologyRes.json();

    const businessRes = await fetch(
      `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=se&language=sv&category=business`
    );
    const businessData = await businessRes.json();

    return {
      props: {
        topNews: topData.results,
        politicsNews: politicsData.results,
        techNews: technologyData.results,
        businessNews: businessData.results,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching news data:", error);

    const placeholderArticle = {
      article_id: -1,
      title: "Placeholder Article",
      image_url: "/placeholder-image.jpg",
    };

    return {
      props: {
        topNews: [placeholderArticle],
        politicsNews: [placeholderArticle],
        techNews: [placeholderArticle],
      },
      revalidate: 10,
    };
  }
}

export default function News({
  topNews,
  politicsNews,
  techNews,
  businessNews,
}) {
  console.log(topNews);
  console.log(politicsNews);
  console.log(techNews);
  console.log(businessNews);

  return (
    <div className="grid mt-40 grid-cols-4 gap-8 mx-20">
      {/* Left Side */}
      <div className="col-span-1 flex flex-col w-full px-20 ">
        <ul className="list-none p-0">
          <h2 className="px-20 ">Todays picks</h2>
          {techNews &&
            techNews
              .filter((article, index) => article.image_url && index < 2)
              .map((article, index) => (
                <li
                  key={article.article_id}
                  className="flex flex-col w-3/5 mb-4"
                >
                  <div>
                    {index === 0 || index === 1 ? (
                      <img
                        className="h-200 w-full"
                        src={article.image_url}
                        alt=""
                      />
                    ) : null}
                    <Link
                      className="no-underline"
                      href={`/article/${article.article_id}`}
                      passHref
                    >
                      <h2 className="text-black dark:text-white text-lg no-underline">
                        {article.title}
                      </h2>
                    </Link>
                  </div>
                </li>
              ))}
        </ul>
      </div>

      {/* Main News (Center) */}
      {/* MAIN1 Section */}
      <div className="col-span-2 flex flex-col justify-center items-center w-full">
        <ul className="flex flex-col items-center w-full">
          {topNews &&
            topNews
              .filter((article, index) => article.image_url && index < 1)
              .map((article, index) => (
                <div key={article.article_id} className="mb-4">
                  <div>
                    {article.image_url && (
                      <img
                        className="h-400 w-full"
                        src={article.image_url}
                        alt=""
                      />
                    )}
                    <Link
                      className="no-underline"
                      href={`/article/${article.article_id}`}
                      passHref
                    >
                      <h2 className="text-black dark:text-white text-4xl">
                        {article.title}
                      </h2>
                    </Link>
                  </div>
                </div>
              ))}
        </ul>
      </div>

      {/* Right Side */}
      <div className="col-span-1 flex justify-center w-full">
        <ul className="list-none p-0">
          <h2 className="px-20 text-xl">Latest</h2>
          {politicsNews &&
            politicsNews
              .filter((article, index) => article.image_url && index < 7)
              .map((article, index) => (
                <li
                  key={article.article_id}
                  className="flex flex-col w-3/5  mb-2 px-20"
                >
                  {/* <div>
                    {index === 0 || index === 1 ? (
                      <img
                        className="h-200 w-full"
                        src={article.image_url}
                        alt=""
                      />
                    ) : null}
                  </div> */}
                  <Link
                    className="no-underline"
                    href={`/article/${article.article_id}`}
                    passHref
                  >
                    <h2 className="text-black dark:text-white text-lg no-underline">
                      {article.title}
                    </h2>
                  </Link>
                </li>
              ))}
        </ul>
      </div>

      {/* Business */}
      <div className="col-span-4">
        <div className="px-20">
          <ul id="MAIN3" className="flex flex-row justify-center w-full p-0">
            {businessNews &&
              businessNews
                .filter(
                  (article, index) =>
                    article.image_url && index >= 2 && index < 6
                )
                .map((article, index) => (
                  <li
                    key={article.article_id}
                    className={`flex w-1/4 flex-col mb-4 ${
                      index === 1 ? "mx-8 " : ""
                    } ${index === 2 ? "mr-8" : ""}`}
                  >
                    <div className="flex flex-col space-y-2 mb-4">
                      {article.image_url && (
                        <img
                          className="h-28 w-full object-cover"
                          src={article.image_url}
                          alt=""
                        />
                      )}
                      <Link
                        className="no-underline"
                        href={`/article/${article.article_id}`}
                      >
                        <h2 className="text-black dark:text-white text-xl no-underline">
                          {article.title}
                        </h2>
                      </Link>
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </div>
      {/* Lifestyle */}
      <div className="col-span-4  px-20">
        <ul id="MAIN3" className="flex justify-center w-full p-0">
          {techNews &&
            techNews
              .filter((article, index) => article.image_url && index === 0)
              .map((article, index) => (
                <li key={article.article_id} className="flex">
                  {article.image_url && (
                    <img
                      className="w-3/4 object-cover"
                      src={article.image_url}
                      alt=""
                    />
                  )}
                  <div className="flex flex-col justify-start ml-4">
                    <Link
                      className="no-underline"
                      href={`/article/${article.article_id}`}
                    >
                      <h2 className="text-black dark:text-white  hover:underline no-underline text-4xl">
                        {article.title}
                      </h2>
                    </Link>
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}
