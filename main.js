const $arena = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

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
    action: {},
    attack: generateAttack,
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
    action: {},
    attack: enemyAttack,
    changeHP,
    elHP,
    renderHP,
};

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
        addParagraph(generateLogs('draw'));
    } else if (player1.hp === 0) {
        $arena.appendChild(showResult(player2.name));
        addParagraph(generateLogs('end', player2.name, player1.name));
    } else {
        $arena.appendChild(showResult(player1.name));
        addParagraph(generateLogs('end', player1.name, player2.name));
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

function defineDamage(player, enemy) {
    if (enemy.action.hit !== player.action.defence) {
        const hitAct = enemy.action.hitValue;
        player.changeHP(hitAct);
        addParagraph(generateLogs('hit', enemy.name, player.name, hitAct, player.hp))
    } else {
        addParagraph(generateLogs('defence', enemy.name, player.name));
    }
}

function fight(player1, player2) {
    defineDamage(player1, player2);
    defineDamage(player2, player1);

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

$chat.appendChild(createStartLog());

$arena.appendChild(createPlayer(playerOne));
$arena.appendChild(createPlayer(playerTwo));

function enemyAttack() {
    const hit = ATTACK[randomizer(3) - 1];
    const hitValue = randomizer(HIT[hit]);
    const defence = ATTACK[randomizer(3) - 1];

    this.action.hit = hit;
    this.action.defence = defence;
    this.action.hitValue = hitValue;
}

function generateAttack(item, name) {
    if (item.checked && item.name === name) {
        if (name === 'hit') {
            this.action.hitValue = randomizer(HIT[item.value]);
        }
        this.action[name] = item.value;
    }
}

function dateFormatter() {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()<10 ? `0${date.getMinutes()}`: date.getMinutes()}`
}

function createStartLog() {
    const $start = createElement('p');
    $start.innerText = generateLogs('start');
    return $start;
}

function addParagraph(text) {
    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}

function generateLogs(type, player1, player2, hitAct, player2HP) {

    switch (type) {
        case 'hit':
            return (
                `${dateFormatter()} - ${
                    logs[type][randomizer(logs[type].length - 1)]
                        .replace('[playerKick]', player1)
                        .replace('[playerDefence]', player2)} -${hitAct} [${player2HP}/100]`
            )
        case 'defence':
            return (
                `${dateFormatter()} - ${
                    logs[type][randomizer(logs[type].length - 1)]
                        .replace('[playerKick]', player1)
                        .replace('[playerDefence]', player2)}`
            )
        case 'start':
            return (
                logs.start
                    .replace('[time]', dateFormatter)
                    .replace('[player1]', playerOne.name)
                    .replace('[player2]', playerTwo.name)
            )

        case 'end':
            return (
                logs.end[randomizer(logs.end.length - 1)]
                    .replace('[playerWins]', player1)
                    .replace('[playerLose]', player2)
            )
        case 'draw':
            return logs.draw;
    }
}

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