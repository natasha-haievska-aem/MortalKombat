const playerOne = {
    name: 'SCORPION',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Kunai','Axe', 'Long Sword'],
    attack: function () {
        console.log(playerOne.name + ' Fight...');
    }
};

const playerTwo = {
    name: 'SUB-ZERO',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ice Scepter','Kori Blade'],
    attack: function () {
        console.log(playerTwo.name + ' Fight...');
    }
};

function createPlayer(position, player) {
    const $player = document.createElement('div');
    $player.classList.add(position);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');

    const $character = document.createElement('div');
    $character.classList.add('character');

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = player.hp +'%';

    const $name = document.createElement('div');
    $name.innerText = player.name;
    $name.classList.add('name');

    const $img = document.createElement('img');
    $img.src = player.img;
    $img.alt = player.name +'_img';


    document.querySelector('.arenas').appendChild($player);
    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

};

createPlayer('player1', playerOne);
createPlayer('player2', playerTwo);