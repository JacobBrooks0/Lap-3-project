import style from "./style.module.css";

export default function Popup() {
  return <div id="pop-up" className={style["container"]} style={{display: "none"}}/>;
}

export const writePopup = async (message) => {
  const popup = document.getElementById("pop-up");
  popup.style.display = "";
  popup.innerHTML = message;
  popup.className = `${style["container"]} popup-fade-in`;

  await new Promise((resolve) => setTimeout(resolve, 4000));

  popup.className = `${style["container"]}`;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  popup.style.display = "none";
  popup.innerHTML = "";
};
