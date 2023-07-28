import { useEffect, useState } from "react";
import axios from "axios";
import { writePopup } from "../../components";
import quizNames from "../../data/quizNames.json";

export default function fetchAllUserInfo() {
  const [userData, setUserData] = useState();
  const [leaderBoardData, setLeaderBoardData] = useState();
  const [quizData, setQuizData] = useState();

  useEffect(() => {
    const getUserDetails = async () => {
      const config = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      try {
        const { data: data1 } = await axios.get(
          `${import.meta.env.VITE_SERVER}/users`,
          config
        );
        const { data: data2 } = await axios.get(
          `${import.meta.env.VITE_SERVER}/leaderboards/user`,
          config
        );

        setUserData(data1);
        setLeaderBoardData(data2);
      } catch (error) {
        console.log(error);
        writePopup(error);
      }
      const { data: data3 } = await axios.get(
        `${import.meta.env.VITE_SERVER}/quizzes/user`,
        config
      );
      setQuizData(data3);
    };
    getUserDetails();
  }, []);

  const quizDataC = quizData?.map((quizObj) => {
    
    quizObj.name = quizNames[quizObj["quiz_id"] - 1];
    return quizObj;
  });
  console.log(quizDataC)
  return {
    user: {
      username: userData?.username,
      streak: userData?.streak,
      lastLogin: userData?.["last_login"],
      creationDate: userData?.creationDate,
      rank: leaderBoardData?.rank,
      experience: leaderBoardData?.total,
    },
    language: {
      Spanish: {
        score: leaderBoardData?.score_spanish,
        quizzes: quizDataC?.filter((quizObj) => quizObj.language_id === 1),
      },
      Italian: {
        score: leaderBoardData?.score_italian,
        quizzes: quizDataC?.filter((quizObj) => quizObj.language_id === 2),
      },
    },
  };
}
