import Link from "next/link";
import { FacebookIcon } from "./SocialIcons";
import { TiktokIcon } from "./SocialIcons";
import { YouTubeIcon } from "./SocialIcons";
import { XIcon } from "./SocialIcons";

export default function Footer() {
  return (
    <div className="bg-slate-900 w-full text-slate-100">
      <div className="custom-thin-border-bottom flex flex-col justify-center items-center px-60 py-12">
        <h2>CHAS NEWS</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut ipsam
          itaque quo iusto rem rerum aspernatur dolorum est. Maxime alias natus
          illum saepe repudiandae doloremque et dicta distinctio quaerat
          laboriosam voluptatibus explicabo autem corporis, cupiditate neque
          fugiat magnam quia adipisci.
        </p>
      </div>
      <div className="flex px-20 py-10">
        <div className="flex flex-col">
          <h3>Categories</h3>
          <Link className="decoration-none no-underline" href={"/"}>
            Home
          </Link>
          <Link className="decoration-none no-underline" href={"/politics"}>
            Politics
          </Link>{" "}
          <Link className="decoration-none no-underline" href={"/business"}>
            Business
          </Link>{" "}
          <Link className="decoration-none no-underline" href={"/technology"}>
            Technology
          </Link>{" "}
        </div>
        <div>
          <FacebookIcon />
          <TiktokIcon />
          <YouTubeIcon />
          <XIcon />
        </div>
      </div>
    </div>
  );
}
