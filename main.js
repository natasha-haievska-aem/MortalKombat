import {$arena, $formFight, $chat} from "./elements/elements.js";
import {playerOne, playerTwo} from "./players/players.js";
import fight from "./gameProcess/fight.js";
import createStartLog from "./gameProcess/start.js";
import {createElement} from "./utils/elementCreators.js";

const createPlayer = ({hp, player, img, name}) => {
    const $player = createElement('div', 'player' + player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    $life.style.width = hp + '%';
    const $name = createElement('div', 'name');
    $name.innerText = name;
    const $img = createElement('img');
    $img.src = img;
    $img.alt = name + '_img';

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    return $player;
}

$arena.appendChild(createPlayer(playerOne));
$arena.appendChild(createPlayer(playerTwo));
$chat.appendChild(createStartLog());

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    playerTwo.attack();
    for (let item of $formFight) {
        playerOne.attack(item, 'hit');
        playerOne.attack(item, 'defence');
        item.checked = false;
    }

    fight(playerOne, playerTwo);
})