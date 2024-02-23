import React from "react";
import Link from "next/link";
import SubscribeButton from "./SubscribeButton";
import ThemeButton from "./ThemeButton";

export default function Navbar() {
  return (
    <div
      className={`flex  justify-between p-3 bg-[#eeeff2ed] dark:bg-[#1A1C21] custom-thin-border-bottom `}
    >
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
        {/* <Link href={"PoliticsTaBort"}>Politics</Link> */}{" "}
      </div>
      <div className="flex ">
        <div className="mx-2">
          <Link
            className="text-decoration-line:none no-underline text-black dark:text-white hover:underline hover:text-sky-800"
            href={"BookMarks"}
          >
            Saved
          </Link>
        </div>
        <SubscribeButton />
        <ThemeButton />
      </div>
    </div>
  );
}
