import React from "react";
import { useAuth } from "../../contexts";

import style from "./style.module.css";

export default function Dashboard() {
  const { user } = useAuth();


  
  const handlePracticeClick = (selectedOption) => {
    
    setSelectedOption(selectedOption);
    
  }
  return (
    <>
      <main id="dashboard" className={style["container"]}>
     
        
      </main>
    </>
  );
}
