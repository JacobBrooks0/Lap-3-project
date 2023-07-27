import { lazy } from "react";
import rankMap from "../../data/rankMap.json";
import Monster from "../../assets/aliens/1.svg"
import fetchAllUserInfo from "./useFetchData";

import style from "./style.module.css";

export default function Profile() {
  const data = fetchAllUserInfo();
  console.log(data);

  return (
    <>
      <div id="profile" className={style["container"]}>
        <div className={style["user-meta"]}>
          <RankImage />
          <p>Rank: {rankMap[data.user.rank]}</p>
          <p>Username: {data.user.username}</p>
          <p>User Since: {new Date(data.user.creationDate).toLocaleString()}</p>
        </div>
      </div>
    </>
  );
}
