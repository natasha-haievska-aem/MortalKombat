import {generateLogs} from "./logGenerator.js";
import {createElement} from "../../utils/elementCreators.js";

const createStartLog = (player1, player2) => {
    const {name: player1Name} = player1;
    const {name: player2Name} = player2;

    const $start = createElement('p');
    $start.innerText = generateLogs('start', player1Name, player2Name);
    return $start;
}

export default createStartLog;