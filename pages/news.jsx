import Subscribe from "@/components/Subscribe";
import Link from "next/link";
import { useState } from "react";

const myAPI_KEY = "pub_3871618366750622e0e00dada303407e93ed8";
const myAPI_KEY2 = "pub_387160e3aa10f141258ac989c4095bffb6ec6";

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
  const [hovered, setIsHovered] = useState(false);

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  return (
    <>
      <div className="grid mt-10 grid-cols-4 gap-8 mx-20">
        <div className="flex col-span-3 flex-col w-full px-0 ">
          <ul className="list-none p-0">
            <div className="block mb-4 border-t-2 border-b-0 border-l-0 border-r-0 border-solid border-black dark:border-[#EEEFF2]">
              <div className="flex">
                <h3 className="bg-black dark:bg-white text-white dark:text-black p-2 m-0 text-sm">
                  Our top pick
                </h3>
              </div>
            </div>

            {techNews &&
              techNews
                .filter((article, index) => article.image_url && index < 1)
                .map((article, index) => (
                  <li key={article.article_id} className="flex mb-4 col-span-2">
                    <div
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {index === 0 || index === 1 ? (
                        <img
                          className="h-96 w-full object-cover"
                          src={article.image_url}
                          alt=""
                        />
                      ) : null}
                      <Link
                        className="no-underline"
                        href={`/article/${article.article_id}`}
                        passHref
                      >
                        <h2
                          className={`text-black dark:text-white text-2xl no-underline ${
                            hovered ? "underline" : ""
                          }`}
                        >
                          {article.title}
                        </h2>
                      </Link>
                      <p className="decoration-none">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ad ipsum illum quia magni incidunt pariatur atque, error
                        accusantium minima eveniet?
                      </p>
                    </div>
                  </li>
                ))}
          </ul>
        </div>
        {/* Main News (Center) - Commented out for now */}
        {/* Right Side */}
        <div className="col-span-1 flex  w-full ">
          <ul className="list-none p-0">
            {/* <div className="block mb-4" style={{ borderTop: "3px solid black" }}> */}
            <div className="block mb-4 border-t-2 border-b-0 border-l-0 border-r-0 border-solid border-black dark:border-[#EEEFF2]">
              <div className="flex">
                <h3 className="bg-black dark:bg-white text-white dark:text-black p-2 m-0 text-sm">
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
          <div className="block mb-4 border-t-2 border-b-0 border-l-0 border-r-0 border-solid border-black dark:border-[#EEEFF2]">
            <div className="flex">
              <h3 className="bg-black dark:bg-white text-white dark:text-black p-2 m-0 text-sm">
                Business
              </h3>
            </div>
          </div>

          {/* Removed px-20 */}
          <ul className="flex flex-row justify-center w-full p-0">
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
                    </div>
                  </li>
                ))}
          </ul>
        </div>
        {/* Lifestyle */}
        <div className="col-span-4 px-0 ">
          <div className="block mb-4 border-t-2 border-b-0 border-l-0 border-r-0 border-solid border-black dark:border-[#EEEFF2]">
            <div className="flex">
              <h3 className="bg-black dark:bg-white text-white dark:text-black p-2 m-0 text-sm">
                Politics
              </h3>
            </div>
          </div>
          {/* Removed px-20 */}
          <ul className="flex justify-center w-full p-0">
            {politicsNews &&
              politicsNews
                .filter((article, index) => article.image_url && index === 0)
                .map((article, index) => (
                  <li key={article.article_id} className="flex w-full">
                    {article.image_url && (
                      <img
                        className="w-full object-cover h-96"
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
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </div>
      <Subscribe />;
    </>
  );

  // function capitalizeFirstLetter(string) {
  //   if (typeof string !== "string" || string.length === 0) {
  //     return ""; // Return an empty string if the input is not a string or is empty
  //   }
  //   return string.charAt(0).toUpperCase() + string.slice(1);

  // }
}
