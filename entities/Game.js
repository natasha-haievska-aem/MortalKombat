import {createElement} from "../utils/elementCreators.js";
import Player from "./Player.js";
import {getPlayers, getPlayerRandom} from "../services/requests.js";
import {$arena, $chat, $formFight} from "../elements/elements.js";
import createStartLog from "../gameProcess/servises/start.js";
// import randomizer from "../utils/randomizer.js";
import {generateAction} from "../gameProcess/servises/fightServices.js";

export default class Game {


    createPlayer = ({hp, player, img, name}) => {
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

    start = async () => {

        // const players = await getPlayers();
        const randomPlayer = await getPlayerRandom();

        const selectedPlayer = JSON.parse(localStorage.getItem('player1'));

        const playerOne =  new Player({
            ...selectedPlayer,
            player: 1
        });

        // const playerTwo = new Player({
        //     ...players[randomizer(players.length) - 1],
        //     player: 2
        // });
        const playerTwo = new Player({
            ...randomPlayer,
            player: 2
        });

        $arena.appendChild(this.createPlayer(playerOne));
        $arena.appendChild(this.createPlayer(playerTwo));
        $chat.appendChild(createStartLog(playerOne, playerTwo));

        $formFight.addEventListener('submit', function (e) {
            e.preventDefault();

            let player1Hit;
            let player1Defence;

            for (let item of $formFight) {
                switch (item.name) {
                    case 'hit':
                        if (item.checked) {
                            player1Hit = item.value;
                        }
                    case 'defence':
                        if (item.checked) {
                            player1Defence = item.value
                        }
                }
                item.checked = false;
            }

            console.log(playerOne, playerTwo);
            generateAction(playerOne, playerTwo, player1Hit, player1Defence);



        });
    }
}