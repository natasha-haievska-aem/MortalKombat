import {$arena, $formFight, $chat} from "./elements/elements.js";
import Player from "./entities/Player.js";
import {ATTACK} from "./constants/attackType.js";
import fight from "./gameProcess/fight.js";
import createStartLog from "./gameProcess/servises/start.js";
import {createElement} from "./utils/elementCreators.js";
import {player1, player2} from './constants/playersData.js'
import randomizer from "./utils/randomizer.js";

import Game from "./entities/Game.js";

const game = new Game();

game.start();


