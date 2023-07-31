import Alien1 from "../../graphics/aliens/1.svg";
import Alien2 from "../../graphics/aliens/2.svg";
import Alien3 from "../../graphics/aliens/3.svg";
import Alien4 from "../../graphics/aliens/4.svg";
import Alien5 from "../../graphics/aliens/5.svg";
import Alien6 from "../../graphics/aliens/6.svg";
import Alien7 from "../../graphics/aliens/7.svg";
import Alien8 from "../../graphics/aliens/8.svg";
import Alien9 from "../../graphics/aliens/9.svg";
import Alien10 from "../../graphics/aliens/10.svg";
import Alien11 from "../../graphics/aliens/11.svg";
import Alien12 from "../../graphics/aliens/12.svg";
import Alien13 from "../../graphics/aliens/13.svg";
import Alien14 from "../../graphics/aliens/14.svg";
import Alien15 from "../../graphics/aliens/15.svg";
import Alien16 from "../../graphics/aliens/16.svg";

export default function getAlienImage(rank) {
  let Alien;
  switch (rank) {
    case 1:
      Alien = Alien2;
      break;
    case 2:
      Alien = Alien3;
      break;
    case 3:
      Alien = Alien9;
      break;
    case 4:
      Alien = Alien4;
      break;
    case 5:
      Alien = Alien11;
      break;
    case 6:
      Alien = Alien6;
      break;
    case 7:
      Alien = Alien7;
      break;
    case 8:
      Alien = Alien8;
      break;
    case 9:
      Alien = Alien9;
      break;
    case 10:
      Alien = Alien10;
      break;
    case 11:
      Alien = Alien5;
      break;
    case 12:
      Alien = Alien12;
      break;
    case 13:
      Alien = Alien13;
      break;
    case 14:
      Alien = Alien14;
      break;
    case 15:
      Alien = Alien15;
      break;
    case 16:
      Alien = Alien16;
      break;
    default:
      Alien = Alien4;
      break;
  }
  return Alien;
}
