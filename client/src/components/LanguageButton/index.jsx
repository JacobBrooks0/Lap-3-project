import React, { useContext } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import LanguageContext from "../../contexts/Language";

export default function LanguageButton() {
    const { setSelectedLanguage, selectedLanguage } = useContext(LanguageContext);
    
  return (
    <>
      <div className={style["language-buttons"]}>
        <Link to="/dashboard" onClick={() => setSelectedLanguage("Spanish")}>
          <img
            src="https://www.countryflags.com/wp-content/uploads/spain-flag-png-large.png"
            alt="Spanish flag"
            className={`${
              selectedLanguage == "Spanish" ? style["selected"] : ""
            }`}
          />
        </Link>
        <Link to="/dashboard" onClick={() => setSelectedLanguage("Italian")}>
          <img
            src="https://www.countryflags.com/wp-content/uploads/italy-flag-png-large.png"
            alt="Italian flag"
            className={`${
                selectedLanguage == "Italian" ? style["selected"] : ""
            }`}
          />
        </Link>
      </div>
    </>
  );
}
