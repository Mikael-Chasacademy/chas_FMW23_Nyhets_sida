import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScroll() {
    const currentScrollPos = window.scrollY;
    // 800 anger hur långt ner på sidan knappen ska dyka upp, annars osynlig
    const isVisible = currentScrollPos > 800;
    setIsVisible(isVisible);
  }

  return (
    <div>
      {isVisible && (
        <button className="topButton" onClick={ScrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} className="icon" />
        </button>
      )}
    </div>
  );
}

export default ScrollToTop;