import {defineDamage} from "./servises/fightServices.js";
import endGame from "./servises/end.js";

const fight = (player1, player2) => {

    defineDamage(player1, player2);
    defineDamage(player2, player1);

    if (player1.hp === 0 || player2.hp === 0) {
        endGame(player1, player2);
    }
}

export default fight;