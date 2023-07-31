import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import style from "./style.module.css";

import getAlienImage from "../../pages/Profile/aliens";

export default function Users() {
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const URL = `${import.meta.env.VITE_SERVER}/leaderboards`;
      try {
        const response = await axios.get(URL);
        setGetData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className={style["container"]}>
        <table className={style["User"]}>
          <tbody>
            <tr>
              <th>Username</th>
              <th>Italian Score</th>
              <th>Spanish Score</th>
              <th>Total Score</th>
              <th>Rank</th>
            </tr>
            {getData.map((getData) => {
              const AlienImage = getAlienImage(getData.rank);
              return (
                <tr key={getData.user_id}>
                  <td>{getData.username}</td>
                  <td>{getData.score_italian}</td>
                  <td>{getData.score_spanish}</td>
                  <td>{getData.total}</td>
                  <td>
                    <span>{getData.rank}</span>
                    <AlienImage />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
