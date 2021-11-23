import {generateLogs} from "./logGenerator.js";
import {createElement} from "../../utils/elementCreators.js";
import {playerOne, playerTwo} from "../../players/players.js";

const createStartLog = () => {
    const {name: player1Name} = playerOne;
    const {name: player2Name} = playerTwo;

    const $start = createElement('p');
    $start.innerText = generateLogs('start', player1Name, player2Name);
    return $start;
}

export default createStartLog;