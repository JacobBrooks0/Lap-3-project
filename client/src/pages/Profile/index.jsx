import rankMap from "../../data/rankMap.json";

import fetchAllUserInfo from "./useFetchData";
import getAlienImage from "./aliens";

import style from "./style.module.css";

export default function Profile() {
  const data = fetchAllUserInfo();
  const AlienImage = getAlienImage(data.user.rank);
  return (
    data.user.rank && (
      <>
        <div className={style["outer-container"]}>
        <main id="profile" className={style["container"]}>
          <div className={style["user-meta"]}>
            <AlienImage className={style["rank-image"]} />
            <p>Rank: {rankMap[data.user.rank]}</p>
            <p>Username: {data.user.username}</p>
            <p>Day Streak: {data.user.streak}</p>
            <p>
              User Since: {new Date(data.user.creationDate).toLocaleString()}
            </p>
            <p>Last Login: {new Date(data.user.lastLogin).toLocaleString()}</p>
          </div>
        </main>
        </div>
        
      </>
    )
  );
}
