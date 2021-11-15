const $arena = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const playerOne = {
    name: 'SCORPION',
    player: 1,
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Kunai', 'Axe', 'Long Sword'],
    attack: function () {
        console.log(playerOne.name + ' Fight...');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
};

const playerTwo = {
    name: 'SUB-ZERO',
    player: 2,
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ice Scepter', 'Kori Blade'],
    attack: function () {
        console.log(playerTwo.name + ' Fight...');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
};

function changeHP(damageLvl, blockedDamage) {
    !blockedDamage ? this.hp = this.hp - damageLvl : this.hp - 0;
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

function damageRandomizer(maxLevel) {
    return Math.ceil(Math.random() * maxLevel);
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

function convertNegativeToZero(num) {
    if (num < 0) {
        return 0;
    } else {
        return num;
    }
}

function endGame(player1, player2) {
    $randomButton.disabled = true;
    choseWinner(player1, player2);
    addReloadOnArena();
}

function fight(player1, player2, maxDamageLevel, player1Block, player2Block) {

    player1.changeHP(damageRandomizer(maxDamageLevel), player1Block);
    player2.changeHP(damageRandomizer(maxDamageLevel), player2Block);

    player1.hp = convertNegativeToZero(player1.hp);
    player2.hp = convertNegativeToZero(player2.hp);

    player1.renderHP();
    player2.renderHP();

    if (player1.hp === 0 || player2.hp === 0) {
        endGame(player1, player2);
    }
}


$randomButton.addEventListener('click', function () {
    fight(playerOne, playerTwo, 20, true, false);
});

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