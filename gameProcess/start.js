import {generateLogs} from "./logGenerator.js";
import {createElement} from "../utils/elementCreators.js";

const createStartLog = () => {
    const $start = createElement('p');
    $start.innerText = generateLogs('start');
    return $start;
}

export default createStartLog;