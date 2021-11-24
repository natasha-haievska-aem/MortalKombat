import {ATTACK, HIT} from "./attackType.js";
import randomizer from "../../utils/randomizer.js";

export function changeHP(damageLvl) {
    damageLvl > this.hp ? this.hp = 0 : this.hp -= damageLvl;
}

export function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

export function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

export function enemyAttack() {
    const hit = ATTACK[randomizer(3) - 1];
    const hitValue = randomizer(HIT[hit]);
    const defence = ATTACK[randomizer(3) - 1];

    this.action.hit = hit;
    this.action.defence = defence;
    this.action.hitValue = hitValue;
}

export function generateAttack(item, name) {
    if (item.checked && item.name === name) {
        if (name === 'hit') {
            this.action.hitValue = randomizer(HIT[item.value]);
        }
        this.action[name] = item.value;
    }
}