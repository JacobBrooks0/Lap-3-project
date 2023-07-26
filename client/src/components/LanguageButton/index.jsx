import React, { useContext } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import LanguageContext from "../../contexts/Language";

export default function LanguageButton() {
    const { setSelectedLanguage } = useContext(LanguageContext);

    return (
        <>
            <div className={style["Language-buttons"]}>
                <Link to="/dashboard" onClick={() => setSelectedLanguage("Spanish")}>
                    <img src="..." alt="Spanish flag" />
                </Link>
                <Link to="/dashboard" onClick={() => setSelectedLanguage("Italian")}>
                    <img src="..." alt="Italian flag" />
                </Link>
            </div>
        </>
    );
}
