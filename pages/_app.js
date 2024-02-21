import { BookMarkProvider } from "@/BookMarkContext";
// import "@/styles/globals.css";
import "../styles/globals.css";
import Link from "next/link";
import { useEffect } from "react";
import { ThemeProvider, useTheme, useThemeDispatch } from "../ThemeContext";
import ThemeButton from "@/components/ThemeButton";
import ScrollToTop from "@/ScrollToTopButton";

function MyApp({ Component, pageProps }) {
  const { state } = useTheme();
  /* const dispatch = useThemeDispatch(); */

  console.log(state);
  console.log(state.userPreferences.theme);

  useEffect(() => {
    
    const rootEl = document.documentElement;
    if (state.userPreferences.theme === "light") {
      rootEl.classList.add('dark');
      rootEl.style.backgroundColor = "black"  // ROOT BACKGROUND COLOR
      rootEl.style.color = "white"  // ROOT TEXT COLOR
    } else if (state.userPreferences.theme === "dark") {
      rootEl.classList.remove('dark');
      rootEl.style.backgroundColor = "white" // ROOT BACKGROUND COLOR
      rootEl.style.color = "black"  // ROOT TEXT COLOR
    } else {
      console.log("Unknown Theme for Dark/Light mode");
    }
    //rootEl.classList.toggle('dark'); //
   
    //document.body.classList.add('dark');
   
  }, [state.userPreferences.theme]); // toggle theme med en knapp, då togglas 'dark' ovanför!

  return (
     <BookMarkProvider>
      <div className="flex justify-between px-3">
        <div className="flex gap-3">
          <ScrollToTop/>
          <Link href={"news"}>News</Link>
          {" "}
            <Link href={"/politics"}>Politics</Link>
          {" "}
          <Link href={"/technology"}>Technology</Link>
          {" "}
          <Link href={"/sports"}>Sports</Link>
          
          <Link href={"BookMarks"}>Bookmark</Link>
          {/* <Link href={"PoliticsTaBort"}>Politics</Link> */}
          {" "}
        
          
        </div>
        <ThemeButton></ThemeButton>
      </div>
        <Component {...pageProps} />

      </BookMarkProvider>   
  );;
}

export default ({ Component, pageProps }) => (
    <ThemeProvider>
        <MyApp Component={Component} pageProps={pageProps} />
    </ThemeProvider>
);
