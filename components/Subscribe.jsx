export default function Subscribe() {
  return (
    <div
      className="col-span-4 h-96 mt-20 flex justify-center items-center p-32"
      style={{
        backgroundImage: "url('/Blue Wallpaper Joyce.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-slate-100 p-20 flex items-center ">
        <div className=" w-2/4 mr-7">
          <h3 className="text-2xl font-semibold">
            SIGN UP FOR THE CHAS NEWS DAILY NEWSLETTER
          </h3>
          <p className="text-sm">
            Our biggest stories, delivered to your inbox every day.
          </p>
          <a>See all stories</a>
        </div>
        <div className="flex flex-col  w-2/4 justify-center ">
          <div className="flex  flex-col">
            <div className="flex justify-start">
              <input
                type="text"
                className="h-10 w-72 mr-8"
                placeholder="Email Address"
              />{" "}
              <button className="bg-black h-10 w-32 p-5 text-base text-slate-100 items-center flex justify-center decoration-none">
                Submit
              </button>
            </div>
            <p className="text-xs">
              By signing up you agree to our User Agreement (including the class
              action waiver and arbitration provisions), our Privacy Policy &
              Cookie Statement and to receive marketing and account-related
              emails from CHAS NEWS. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
