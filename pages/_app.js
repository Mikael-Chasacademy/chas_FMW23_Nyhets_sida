import { BookMarkProvider } from "@/BookMarkContext";
import "../styles/globals.css";
import Link from "next/link";
import { useEffect } from "react";
import { ThemeProvider, useTheme, useThemeDispatch } from "../ThemeContext";
import ThemeButton from "@/components/ThemeButton";
import ScrollToTop from "@/ScrollToTopButton";
import { Inter } from "next/font/google";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <Navbar />
<ThemeButton/>
      <ScrollToTop />
      <Component {...pageProps} />
      <Footer />
    </BookMarkProvider>
  );
}

export default ({ Component, pageProps }) => (
  <ThemeProvider>
    <MyApp Component={Component} pageProps={pageProps} />
  </ThemeProvider>
);
