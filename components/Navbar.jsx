import React from "react";
import Link from "next/link";
import SubscribeButton from "./SubscribeButton";
import ThemeButton from "./ThemeButton";

export default function Navbar() {
  return (
    <div>
      
    
    <div
      className={`navbar flex justify-between items-center p-3 bg-[#eeeff2ed] dark:bg-[#1A1C21] custom-thin-border-bottom transition-colors duration-200`}
    >
      <div className="flex justify-start">

        <div className="flex gap-4">
        <img
          className="flex sm:hidden text-white fill-black dark:fill-white"
          src="https://d33wubrfki0l68.cloudfront.net/79e75114856ae61628d2ad26504e3ff4ab2c71b6/f06a4/assets/svg/ham-menu.svg"
          alt="hamburger menu"
        /> 
          <img alt="WIRED" class="ResponsiveImageContainer-eybHBd fptoWY responsive-image__image" src="https://www.wired.com/verso/static/wired/assets/logo-header.svg" srcset="" sizes="100vw"></img>
        </div>
        <div className="hidden sm:flex justify-start gap-3 items-center mx-4 ">
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
      </div>
      <div className="flex justify-center items-center">
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
    </div>
  );
}
