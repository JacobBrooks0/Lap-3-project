import React from "react";
import { LanguageButton } from "../../components";
import style from "./style.module.css";

export default function LanguageSelection() {
    return (
        <>
            <main id="Language-selection" className={style["container"]}>
                <h1>Pick a Language you want to learn today!</h1>
                <LanguageButton />
            </main>
        </>
    );
}
