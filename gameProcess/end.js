import {choseWinner} from "./servises/services.js";
import {addReloadOnArena} from "../utils/elementCreators.js";

const endGame = (player1, player2) => {
    document.querySelector('.button').disabled = true;
    choseWinner(player1, player2);
    addReloadOnArena();
}

export default endGame;