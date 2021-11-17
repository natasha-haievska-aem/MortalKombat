const $arena = document.querySelector('.arenas');
const $formFight = document.querySelector('.control')

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

const playerOne = {
    name: 'SCORPION',
    player: 1,
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Kunai', 'Axe', 'Long Sword'],
    attack,
    changeHP,
    elHP,
    renderHP,
};

const playerTwo = {
    name: 'SUB-ZERO',
    player: 2,
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ice Scepter', 'Kori Blade'],
    attack,
    changeHP,
    elHP,
    renderHP,
};

function attack() {
    console.log(this.name + ' Fight...');
}

function changeHP(damageLvl) {
    damageLvl > this.hp ? this.hp = 0 : this.hp -= damageLvl;
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
    this.elHP().style.width = this.hp + '%';
}


function createElement(tag, className) {
    const $element = document.createElement(tag);
    if (className) {
        $element.classList.add(className);
    }
    return $element;
}

function createPlayer(player) {
    const $player = createElement('div', 'player' + player.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    $life.style.width = player.hp + '%';
    const $name = createElement('div', 'name');
    $name.innerText = player.name;
    const $img = createElement('img');
    $img.src = player.img;
    $img.alt = player.name + '_img';

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    return $player;
}

function randomizer(maxNumber) {
    return Math.ceil(Math.random() * maxNumber);
}

function choseWinner(player1, player2) {

    if (player1.hp === 0 && player2.hp === 0) {
        $arena.appendChild(showResult());
    } else if (player1.hp === 0) {
        $arena.appendChild(showResult(player2.name));
    } else {
        $arena.appendChild(showResult(player1.name));
    }
}

function showResult(name) {
    const $title = createElement('div', 'result');
    if (name) {
        $title.innerText = name + ' won!';
    } else {
        $title.innerText = 'its draw'
    }
    return $title;
}

function endGame(player1, player2) {
    document.querySelector('.button').disabled = true;
    choseWinner(player1, player2);
    addReloadOnArena();
}

function defineDamage(player, enemyHit, hitValue, playerDefence) {
    if (enemyHit !== playerDefence) {
        player.changeHP(hitValue)
    }
}

function fight(player1, player2, player1Action, player2Action) {

    defineDamage(player1, player2Action.hit, player2Action.value, player1Action.defence);
    defineDamage(player2, player1Action.hit, player1Action.value, player2Action.defence);

    player1.renderHP();
    player2.renderHP();

    if (player1.hp === 0 || player2.hp === 0) {
        endGame(player1, player2);
    }
}

function createReloadButton() {
    const $reloadBtnWrap = createElement('div', 'reloadWrap');
    const $reloadBtn = createElement('button', 'button');
    $reloadBtn.innerText = 'Restart';
    $reloadBtnWrap.appendChild($reloadBtn);
    return $reloadBtnWrap;
}

function addReloadOnArena() {
    $arena.appendChild(createReloadButton());
    const $restartButton = document.querySelector('.reloadWrap');

    $restartButton.addEventListener('click', function () {
        window.location.reload();
    });
}

$arena.appendChild(createPlayer(playerOne));
$arena.appendChild(createPlayer(playerTwo));

function enemyAttack() {
    const hit = ATTACK[randomizer(3) - 1];
    const defence = ATTACK[randomizer(3) - 1];
    return {
        value: randomizer(HIT[hit]),
        hit,
        defence
    };
}

let playerAction = {};

function generateAttack(item, name) {

    if (item.checked && item.name === name) {
        if (name === 'hit') {
            playerAction.value = randomizer(HIT[item.value]);
        }
        playerAction[name] = item.value;
    }

    return playerAction;
}

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const enemyAction = enemyAttack();

    for (let item of $formFight) {
        generateAttack(item, 'hit');
        generateAttack(item, 'defence');
        item.checked = false;
    }
    console.log('PA', playerAction);
    console.log('EA', enemyAction);


    fight(playerOne, playerTwo, playerAction, enemyAction);

})