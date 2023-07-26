import { Leaderboard } from "../../components";
import style from "./style.module.css";
import { Users } from "../../components"


import React from 'react'

export default function ShowLeaderboard() {
  return (
    <>

        <div className={style["leader"]}>
            <Leaderboard/>
            <Users/>
            
        </div>
    </>
    
  )
}


