const $arena = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $refreshButton = document.querySelector('#refresh');
$refreshButton.disabled = true;

const playerOne = {
    name: 'SCORPION',
    player: 1,
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Kunai', 'Axe', 'Long Sword'],
    attack: function () {
        console.log(playerOne.name + ' Fight...');
    }
};

const playerTwo = {
    name: 'SUB-ZERO',
    player: 2,
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ice Scepter', 'Kori Blade'],
    attack: function () {
        console.log(playerTwo.name + ' Fight...');
    }
};

function createElement(tag, className) {
    const $element = document.createElement(tag);
    if (className) {
        $element.classList.add(className);
    }
    ;
    return $element;
};

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
};

function damageRandomizer(maxLevel) {
    return Math.ceil(Math.random() * maxLevel);
};

function choseWinner(player1, player2) {

    if (player1.hp === 0 && player2.hp === 0) {
        $arena.appendChild(showResult());
    } else if (player1.hp === 0) {
        $arena.appendChild(showResult(player2.name));
    } else {
        $arena.appendChild(showResult(player1.name));
    }
};

function fight(player1, player2, maxDamageLevel) {

    function changeHP(player) {
        const $playerLife = document.querySelector('.player' + player.player + ' .life');
        player.hp -= damageRandomizer(maxDamageLevel);
        if (player.hp < 0) {
            player.hp = 0;
        };
        $playerLife.style.width = player.hp + '%';

        return player;
    };

    const p1 = changeHP(player1);
    const p2 = changeHP(player2);

    if (p1.hp === 0 || p2.hp === 0) {
        $randomButton.disabled = true;
        $refreshButton.disabled = false;
        choseWinner(p1, p2);
    };
};

function showResult(name) {
    const $title = createElement('div', 'result');
    if (name) {
        $title.innerText = name + ' won!';
    } else {
        $title.innerText = 'its draw'
    }

    return $title;
};

$randomButton.addEventListener('click', function () {
    fight(playerOne, playerTwo, 20);
});

$refreshButton.addEventListener('click', function () {
    window.location.reload();
});

$arena.appendChild(createPlayer(playerOne));
$arena.appendChild(createPlayer(playerTwo));





