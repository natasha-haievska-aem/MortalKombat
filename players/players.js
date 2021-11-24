import {changeHP, elHP, renderHP, enemyAttack, generateAttack} from "./actions/actions.js";

export const playerOne = {
    name: 'SCORPION',
    player: 1,
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Kunai', 'Axe', 'Long Sword'],
    action: {},
    attack: generateAttack,
    changeHP,
    elHP,
    renderHP,
};

export const playerTwo = {
    name: 'SUB-ZERO',
    player: 2,
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ice Scepter', 'Kori Blade'],
    action: {},
    attack: enemyAttack,
    changeHP,
    elHP,
    renderHP,
};