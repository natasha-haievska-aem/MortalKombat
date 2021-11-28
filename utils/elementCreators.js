import {$chat, $arena} from "../elements/elements.js";

export const createElement = (tag, className) => {
    const $element = document.createElement(tag);
    if (className) {
        $element.classList.add(className);
    }
    return $element;
}

const createReloadButton = () => {
    const $reloadBtnWrap = createElement('div', 'reloadWrap');
    const $reloadBtn = createElement('button', 'button');
    $reloadBtn.innerText = 'Restart';
    $reloadBtnWrap.appendChild($reloadBtn);
    return $reloadBtnWrap;
}

export const addReloadOnArena = () => {
    $arena.appendChild(createReloadButton());
    const $restartButton = document.querySelector('.reloadWrap');

    $restartButton.addEventListener('click', function () {
        window.location.pathname = 'MortalKombat/index.html';

    });
}

export const addParagraph = (text) => $chat.insertAdjacentHTML('afterbegin', `<p>${text}</p>`);

