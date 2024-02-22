import Link from "next/link";

const myAPI_KEY = "pub_382120086c1799d089c0da41a4c9ee4d8a9ec";

export async function getStaticProps() {
  const fetchNews = async (category) => {
    const res = await fetch(
      `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=se&language=sv&category=${category}`
    );
    const data = await res.json();
    return data.results;
  };

  const [topNews, politicsNews, techNews, businessNews] = await Promise.all([
    fetchNews("top"),
    fetchNews("politics"),
    fetchNews("technology"),
    fetchNews("business"),
  ]);

  return {
    props: {
      topNews,
      politicsNews,
      techNews,
      businessNews,
    },
    revalidate: 10,
  };
}

export default function News({
  topNews,
  politicsNews,
  techNews,
  businessNews,
}) {
  return (
    <div className="grid mt-10 grid-cols-4 gap-8 mx-20">
      <div className="flex col-span-3 flex-col w-full px-0 ">
        <div>
          <ul className="list-none p-0">
            <div
              className="block mb-4 border-t-1 border-b-0 border-l-0 border-r-0 border-solid border-black dark:border-[#EEEFF2]"
            >
              <div className="flex">
                <h3 className="bg-black dark:bg-white text-white dark:text-black p-1 m-0">
                  Our top pick
                </h3>
              </div>
            </div>

            {techNews &&
              techNews
                .filter((article, index) => article.image_url && index < 1)
                .map((article, index) => (
                  <li key={article.article_id} className="flex mb-4 col-span-2">
                    <div>
                      <p>{capitalizeFirstLetter(article.category)}</p>

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
                        <h2 className="text-black dark:text-white text-2xl no-underline hover:underline">
                          {article.title}
                        </h2>
                      </Link>
                      <p>{article.creator}</p>
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </div>
      {/* Main News (Center) - Commented out for now */}
      {/* Right Side */}
      <div className="col-span-1 flex  w-full ">
        <ul className="list-none p-0">
        {/* <div className="block mb-4" style={{ borderTop: "3px solid black" }}> */}
          <div className="block mb-4 border-t-1 border-b-0 border-l-0 border-r-0 border-solid border-black dark:border-[#EEEFF2]">
            <div className="flex">
              <h3 className="bg-black dark:bg-white text-white dark:text-black p-1 m-0">
                Latest
              </h3>
            </div>
          </div>
          {politicsNews &&
            politicsNews
              .filter((article, index) => article.image_url && index < 4)
              .map((article, index) => (
                <li
                  key={article.article_id}
                  className="flex flex-col w-5/5 mb-2 px-0"
                >
                  {" "}
                  {/* Removed px-20 */}
                  <Link
                    className="no-underline"
                    href={`/article/${article.article_id}`}
                    passHref
                  >
                    <h2 className="text-black dark:text-white text-lg no-underline hover:underline">
                      {article.title}
                    </h2>
                  </Link>
                  <p>{article.creator}</p>
                </li>
              ))}
        </ul>
      </div>
      {/* Business */}
      <div className="col-span-4 px-0">
        {" "}
        {/* Removed px-20 */}
        <ul className="flex flex-row justify-center w-full p-0">
          {businessNews &&
            businessNews
              .filter(
                (article, index) => article.image_url && index >= 2 && index < 6
              )
              .map((article, index) => (
                <li
                  key={article.article_id}
                  className={`flex w-1/4 flex-col mb-4 ${
                    index === 1 ? "mx-8" : ""
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
                      <h2 className="text-black dark:text-white text-xl no-underline hover:underline">
                        {article.title}
                      </h2>
                    </Link>
                    <p>{article.creator}</p>
                  </div>
                </li>
              ))}
        </ul>
      </div>
      {/* Lifestyle */}
      <div className="col-span-4 px-0">
        {" "}
        {/* Removed px-20 */}
        <ul className="flex justify-center w-full p-0">
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
                      <h2 className="text-black dark:text-white hover:underline no-underline text-4xl">
                        {article.title}
                      </h2>
                    </Link>
                    <p>{article.creator}</p>
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );

  function capitalizeFirstLetter(string) {
    if (typeof string !== "string" || string.length === 0) {
      return ""; // Return an empty string if the input is not a string or is empty
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
