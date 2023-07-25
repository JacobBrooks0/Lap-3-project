import React from "react";
import { useAuth } from "../../contexts";
import { Link } from 'react-router-dom';

import style from "./style.module.css";

export default function Dashboard() {
  
  const { user } = useAuth();
  const [difficulty, setDifficulty] = useState([]);

  return (
    <>
      <main id="dashboard" className={style["container"]}>
          <div className={style["practice"]}>
            <Link to="/learn">
              <div id="practice1" className={style["practice"]}>
                <h1>Practice 1</h1>
              </div>
            </Link>
            <Link to="/learn">
            <div id="practice2" >
              <h1>Practice 2</h1>
            </div>
            </Link>
          </div>
          <div>
            <Link to="quiz">
            <div>Beginner</div>
            </Link>
            <Link to="quiz">
            <div>Intermediate</div>
            </Link>
            <Link to="quiz">
            <div>Advanced</div>
            </Link>
            
          </div>
      </main>
    </>
  );
}
