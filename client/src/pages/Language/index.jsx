import React from "react";
import { LanguageButton } from "../../components";
import style from "./style.module.css";

export default function LanguageSelection() {
    return (
        <>
            <main id="language-selection">
                <div className={style["container"]}>
                    <h1>Pick a language you want to learn</h1>
                    <LanguageButton />
                </div>
            </main>
        </>
    );
}
