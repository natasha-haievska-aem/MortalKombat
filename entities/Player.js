
export default class Player {
    constructor({player, name, hp, img, action = {}}) {
        this.player = player;
        this.name = name;
        this.hp = hp;
        this.img = img;
        this.action = action;
    };

    elHP = () => document.querySelector(`.player${this.player} .life`);

    renderHP = () => this.elHP().style.width = `${this.hp}%`;

    changeHP = (damageLvl) => damageLvl > this.hp ? this.hp = 0 : this.hp -= damageLvl;

    attack = (target, actionType, value) => {
        if (actionType === 'hit') {
            this.action.hitValue = value;
        }
        this.action[actionType] = target;
    };

};