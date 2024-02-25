import { useContext, useState } from "react";
import { BookMarkContext } from "@/BookMarkContext";

function BookmarkTogglerButton({ article }) {
  const { state, dispatch } = useContext(BookMarkContext);
  const [bookmarkText, setBookmarkText] = useState("");
  const [bookmarkAricleID, setBookmarkAricleID] = useState(false);

  function toggleBookmark(article) {
    const isBookMarked = state.bookmarks.some(
        (item) => item.id === article.article_id
      );
      if (isBookMarked) {
        deleteBookmark(article);
      } else {
        addBookmark(article);
      }
  }

  function addBookmark(article) {
    dispatch({
        type: "add",
        id: article.article_id,
      });
      setBookmarkAricleID(article.article_id); // Spara artikel-ID
      setBookmarkText("Bookmark added to Saved Articles");
      setTimeout(() => setBookmarkText(""), 2000); // Fade out after 2 seconds
  }

  function deleteBookmark(article) {
    dispatch({
        type: "delete",
        id: article.article_id,
      });
      setBookmarkAricleID(article.article_id); // Spara artikel-ID
      setBookmarkText("Bookmark removed from Saved Articles");
      setTimeout(() => setBookmarkText(""), 2000); // Fade out after 2 seconds
  }

  function getButtonInfo(article) {
    const isBookmarked = state.bookmarks.some(
        (item) => item.id === article.article_id
      );
      const buttonText = isBookmarked ? "Remove Bookmark" : "Add Bookmark";
      const buttonIcon = isBookmarked ? "bookmark_remove" : "bookmark_added";
      return { text: buttonText, icon: buttonIcon };
  }

  return (
    <div>
      <div className="bookmark-btn-wrapper">
        <button
          className="bookmark-btn"
          onClick={() => toggleBookmark(article)}
        >
          <span className="material-symbols-outlined">
            {getButtonInfo(article).icon}
          </span>{" "}
          &nbsp; {getButtonInfo(article).text}
        </button>
        {bookmarkAricleID === article.article_id && (
          <span className="fade-out-text">{bookmarkText}</span>
        )}
      </div>
    </div>
  );
}

export default BookmarkTogglerButton;
