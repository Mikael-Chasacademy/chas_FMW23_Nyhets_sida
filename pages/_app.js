import { BookMarkProvider } from "@/BookMarkContext";
// import "@/styles/globals.css";
import "../styles/globals.css";
import Link from "next/link";
import { useEffect } from "react";
import { ThemeProvider, useTheme, useThemeDispatch } from "../ThemeContext";
import ThemeButton from "@/components/ThemeButton";
import ScrollToTop from "@/ScrollToTopButton";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  const { state } = useTheme();
  /* const dispatch = useThemeDispatch(); */

  console.log(state);
  console.log(state.userPreferences.theme);

  useEffect(() => {
    //bg-[#eeeff2ed] dark:bg-[#1A1C21]

    const rootEl = document.documentElement;
    if (state.userPreferences.theme === "light") {
      rootEl.classList.add("dark");
      rootEl.style.backgroundColor = "#1A1C21"; // ROOT BACKGROUND COLOR
      rootEl.style.color = "#eeeff2ed"; // ROOT TEXT COLOR
    } else if (state.userPreferences.theme === "dark") {
      rootEl.classList.remove("dark");
      rootEl.style.backgroundColor = "#eeeff2ed"; // ROOT BACKGROUND COLOR
      rootEl.style.color = "#1A1C21"; // ROOT TEXT COLOR
    } else {
      console.log("Unknown Theme for Dark/Light mode");
    }
    //rootEl.classList.toggle('dark'); //

    //document.body.classList.add('dark');
  }, [state.userPreferences.theme]); // toggle theme med en knapp, då togglas 'dark' ovanför!

  return (
    <BookMarkProvider>
      {/* top bar shown on all sites */}
      <div
        className={`${inter.className} flex  justify-between p-3 bg-[#eeeff2ed] dark:bg-[#1A1C21] custom-thin-border-bottom `}
      >
        <div className="flex ">
          <ScrollToTop />
          {/* <div>
              logga?
            </div> */}

          <div className="flex gap-3 items-center mx-20">
            <Link
              className="text-decoration-line:none no-underline text-black dark:text-white hover:underline hover:text-sky-800"
              href={"/"}
            >
              Home
            </Link>{" "}
            <Link
              className="text-decoration-line:none no-underline text-black dark:text-white hover:underline hover:text-sky-800"
              href={"/politics"}
            >
              Politics
            </Link>{" "}
            <Link
              className="text-decoration-line:none no-underline text-black dark:text-white hover:underline hover:text-sky-800"
              href={"/technology"}
            >
              Technology
            </Link>{" "}
            <Link
              className="text-decoration-line:none no-underline text-black dark:text-white hover:underline hover:text-sky-800"
              href={"/sports"}
            >
              Sports
            </Link>
            <div>
              <Link
                className="text-decoration-line:none no-underline text-black dark:text-white hover:underline hover:text-sky-800"
                href={"BookMarks"}
              >
                Bookmarks
              </Link>
            </div>
            {/* <Link href={"PoliticsTaBort"}>Politics</Link> */}{" "}
          </div>
        </div>
        <button className="h-9 w-20 bg-sky-700">Subscribe</button>
        <ThemeButton />
      </div>

      <Component {...pageProps} />
    </BookMarkProvider>
  );
}

export default ({ Component, pageProps }) => (
  <ThemeProvider>
    <MyApp Component={Component} pageProps={pageProps} />
  </ThemeProvider>
);
