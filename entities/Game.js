import {createElement} from "../utils/elementCreators.js";
import Player from "./Player.js";
import {player1, player2} from "../constants/playersData.js";
import {$arena, $chat, $formFight} from "../elements/elements.js";
import createStartLog from "../gameProcess/servises/start.js";
import {ATTACK} from "../constants/attackType.js";
import randomizer from "../utils/randomizer.js";
import fight from "../gameProcess/fight.js";

export default class Game {
    start = () =>{

        const playerOne = new Player(player1);
        const playerTwo = new Player(player2);

        const createPlayer = ({hp, player, img, name}) => {
            const $player = createElement('div', `player${player}`);
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
        $chat.appendChild(createStartLog(playerOne, playerTwo));

        $formFight.addEventListener('submit', function (e) {
            e.preventDefault();
            const hit = ATTACK[randomizer(3) - 1];
            const defence = ATTACK[randomizer(3) - 1];

            playerTwo.attack(hit, 'hit');
            playerTwo.attack(defence, 'defence');

            for (let item of $formFight) {
                switch (item.name) {
                    case 'hit': playerOne.attack(item.value, 'hit');
                    case 'defence': playerOne.attack(item.value, 'defence');
                }
                item.checked = false;
            }

            fight(playerOne, playerTwo);
        });
    }
}