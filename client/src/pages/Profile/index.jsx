import rankMap from "../../data/rankMap.json";

import fetchAllUserInfo from "./useFetchData";
import getAlienImage from "./aliens";
import { LogoutButton, DeleteAccount } from "../../components";

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
              <p className={style["rank"]}>
                <div>
                  <span>{data.user.rank}</span>
                  <span>{rankMap[data.user.rank -1]}</span>
                </div>
              </p>
              <div>
                <AlienImage className={style["rank-image"]} />
              </div>
              <p>Username: {data.user.username}</p>
              <p>Day Streak: {data.user.streak}</p>
              <p>
                User Since: {new Date(data.user.creationDate).toLocaleString()}
              </p>
              <p>
                Last Login: {new Date(data.user.lastLogin).toLocaleString()}
              </p>
            </div>
            <div className={style["l-data-actions"]}>
              <h1>Stats</h1>
              <div className={style["italian-info"]}>
                <div className={style["name"]}>
                  <div>Italian</div>
                  <img
                    src="https://www.countryflags.com/wp-content/uploads/italy-flag-png-large.png"
                    alt="Italian flag"
                  />
                  <div>Total Score: {data.language.Italian.score}</div>
                </div>
                <table>
                  <tr>
                    <th>Quiz</th>
                    <th>Beginner</th>
                    <th>Intermediate</th>
                    <th>Advanced</th>
                  </tr>
                  {data.language.Italian.quizzes?.map((quizData) => {
                    return (
                      <tr>
                        <td>{quizData.name}</td>
                        <td>{quizData["beginner_score"]}</td>
                        <td>{quizData["intermediate_score"]}</td>
                        <td>{quizData["advanced_score"]}</td>
                      </tr>
                    );
                  })}
                </table>
              </div>
              <div className={style["spanish-info"]}>
                <div className={style["name"]}>
                  <div>Spanish</div>
                  <img
                    src="https://www.countryflags.com/wp-content/uploads/spain-flag-png-large.png"
                    alt="Spanish flag"
                  />
                  <div>Total Score: {data.language.Spanish.score}</div>
                </div>
                <table>
                  <tr>
                    <th>Quiz</th>
                    <th>Beginner</th>
                    <th>Intermediate</th>
                    <th>Advanced</th>
                  </tr>
                  {data.language.Spanish.quizzes?.map((quizData) => {
                    return (
                      <tr>
                        <td>{quizData.name}</td>
                        <td>{quizData["beginner_score"]}</td>
                        <td>{quizData["intermediate_score"]}</td>
                        <td>{quizData["advanced_score"]}</td>
                      </tr>
                    );
                  })}
                </table>
              </div>
              <div>
                <h1>Actions</h1>
                <LogoutButton />
                <DeleteAccount />
              </div>
            </div>
          </main>
        </div>
      </>
    )
  );
}
