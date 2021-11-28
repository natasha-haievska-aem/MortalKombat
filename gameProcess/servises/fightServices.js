import {$arena} from "../../elements/elements.js";
import {addParagraph, createElement} from "../../utils/elementCreators.js";
import {generateLogs} from "./logGenerator.js";
import {actionPlayer} from "../../services/requests.js";
import fight from "../fight.js";


const showResult = (name) => {
    const $title = createElement('div', 'result');
    if (name) {
        $title.innerText = name + ' won!';
    } else {
        $title.innerText = 'its draw'
    }
    return $title;
}

export const choseWinner = ({hp: hp1, name: name1}, {hp: hp2, name: name2}) => {
    if (hp1 === 0 && hp2 === 0) {
        $arena.appendChild(showResult());
        addParagraph(generateLogs('draw'));
    } else if (hp1 === 0) {
        $arena.appendChild(showResult(name2));
        addParagraph(generateLogs('end', name2, name1));
    } else {
        $arena.appendChild(showResult(name1));
        addParagraph(generateLogs('end', name1, name2));
    }
}

export const defineDamage = (player, {action: {hit, hitValue}, name}) => {
    if (hit !== player.action.defence) {
        player.changeHP(hitValue);
        player.renderHP();
        addParagraph(generateLogs('hit', name, player.name, hitValue, player.hp))
    } else {
        addParagraph(generateLogs('defence', name, player.name));
    }
}

export const generateAction = async (player, enemy, hit, defence) => {
    const {player1: {value: playerHitValue, hit: playerHit, defence: playerDefence},
        player2: {value: enemyHitValue, hit: enemyHit, defence: enemyDefence}} = await actionPlayer(hit, defence);

    enemy.attack(enemyHit, 'hit', enemyHitValue);
    enemy.attack(enemyDefence, 'defence');

    player.attack(playerHit, 'hit', playerHitValue);
    player.attack(playerDefence, 'defence');

    await fight(player, enemy);

}

