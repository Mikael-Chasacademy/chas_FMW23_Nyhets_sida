import { BookMarkProvider } from "@/BookMarkContext";
import "@/styles/globals.css";
import Link from "next/link";

export default function App({ Component, pageProps }) {
  return (
    <>
     {/* <Link href={"/"}>Home</Link> */}
     <BookMarkProvider>

        <Link href={"news"}>News</Link>
        <Link href={"BookMarks"}>Bookmark</Link>
        <Link href={"Politics"}>Politics</Link>
        <Component {...pageProps} />

      </BookMarkProvider>
    </>
   
  );
}
