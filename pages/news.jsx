import Link from "next/link";

const myAPI_KEY = "pub_38305e955fd48635fc6aea34d9011d6189f5a";

export async function getStaticProps() {
  const mainRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=se&language=sv&category=top`
  );
  const mainData = await mainRes.json();

  const politicsRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=se&language=sv&category=politics`
  );
  const politicsData = await politicsRes.json();

  const technologyRes = await fetch(
    `https://newsdata.io/api/1/news?apikey=${myAPI_KEY}&country=se&language=sv&category=technology`
  );
  const technologyData = await technologyRes.json();

  return {
    props: {
      mainNews: mainData.results,
      rightSideNews: politicsData.results,
      leftSideNews: technologyData.results,
    },

    revalidate: 10,
  };
}

export default function News({ mainNews, rightSideNews, leftSideNews }) {
  console.log(mainNews);
  console.log(rightSideNews);
  console.log(leftSideNews);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        // gap: "20px",
        marginTop: "100px",
        // color: "black",
        padding: "20px",
        // backgroundColor: "red",
        width: "100%",
      }}
    >
      <div
        style={{
          gridColumn: "3 / span 9",
          gridRow: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingRight: "20px",
          paddingLeft: "20px",
          // backgroundColor: "blue",
          width: "80%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            // backgroundColor: "yellow",
            width: "80%",
          }}
        >
          <ul id="MAIN1" style={{ listStyleType: "none", padding: 0 }}>
            {mainNews &&
              mainNews
                .filter((article, index) => article.image_url && index < 2)
                .map((article, index) => (
                  <li
                    style={{
                      display: "flex",
                      marginBottom: "20px",
                      flexDirection: "column",
                      borderBottom: index < 2 ? "0.5px solid black" : null,
                    }}
                    key={article.article_id}
                  >
                    <div>
                      {article.image_url && (
                        <img
                          style={{
                            height: "400px",
                            width: "100% ",
                          }}
                          src={article.image_url}
                          alt=""
                        />
                      )}
                    </div>
                    <Link
                      style={{ textDecoration: "none" }}
                      href={`/article/${article.article_id}`}
                    >
                      <h2
                        className="text-black dark:text-white"
                        style={{
                          fontSize: "30px",
                          // color: "black",
                          textDecoration: "none",
                        }}
                      >
                        {article.title}
                      </h2>
                    </Link>
                  </li>
                ))}
          </ul>
          <ul
            id="MAIN2"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
              padding: 0,
            }}
          >
            {mainNews &&
              mainNews
                .filter(
                  (article, index) =>
                    article.image_url && index >= 2 && index < 5
                )
                .map((article, index) => (
                  <li
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      borderBottom: "0.5px solid black",
                    }}
                    key={article.article_id}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div>
                        {article.image_url && (
                          <img
                            style={{
                              height: "100px",
                              width: "66%",
                            }}
                            src={article.image_url}
                            alt=""
                          />
                        )}
                      </div>
                      <Link
                        style={{ textDecoration: "none", width: "100%" }}
                        href={`/article/${article.article_id}`}
                      >
                        <h2
                          className="text-black dark:text-white"
                          style={{
                            fontSize: "20px",
                            // color: "black",
                          }}
                        >
                          {article.title}
                        </h2>
                      </Link>
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </div>

      <div
        style={{
          gridColumn: "10 / span 3",
          gridRow: "1",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul
          style={{
            textDecoration: "none",
            // width: "100%",
            alignItems: "center",
            listStyleType: "none",
            padding: 0,
          }}
        >
          {rightSideNews &&
            rightSideNews
              .filter((article, index) => article.image_url && index < 5)
              .map((article, index) => (
                <li
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    // alignItems: "center",
                    marginBottom: "10px",
                    borderBottom: index < 3 ? "0.5px solid black" : null,
                  }}
                  key={article.article_id}
                >
                  <div>
                    {index === 0 ? (
                      <img
                        style={{
                          height: "200px",
                          width: "100%",
                        }}
                        src={article.image_url}
                        alt=""
                      />
                    ) : null}
                  </div>
                  <Link
                    style={{ textDecoration: "none" }}
                    href={`/article/${article.article_id}`}
                  >
                    <h2
                      className="text-black dark:text-white"
                      style={{
                        fontSize: "20px",
                        // color: "black",
                        textDecoration: "none",
                      }}
                    >
                      {article.title}
                    </h2>
                  </Link>
                </li>
              ))}
        </ul>
      </div>
      <div
        style={{
          gridColumn: "1 / span 3",
          gridRow: "1",
          display: "flex",
          flexDirection: "column",

          alignItems: "flex-start",
          paddingRight: "20px",
          paddingLeft: "20px",
          // backgroundColor: "red",
        }}
      >
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {leftSideNews &&
            leftSideNews
              .filter((article, index) => article.image_url && index < 2)
              .map((article, index) => (
                <li
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderBottom: index < 1 ? "0.5px solid black" : null,
                    // alignItems: "start",
                  }}
                  key={article.article_id}
                >
                  <div>
                    {index === 0 || index === 1 ? (
                      <img
                        style={{
                          height: "200px",
                          width: "100%",
                        }}
                        src={article.image_url}
                        alt=""
                      />
                    ) : null}
                  </div>
                  <Link
                    style={{ textDecoration: "none" }}
                    href={`/article/${article.article_id}`}
                  >
                    <h2
                      className="text-black dark:text-white"
                      style={{
                        fontSize: "20px",
                        // color: "black",
                        textDecoration: "none",
                      }}
                    >
                      {article.title}
                    </h2>
                  </Link>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}
