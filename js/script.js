import buttons from './buttons.js';

const arrKey = buttons.en; // Массив объектов с кнопочками
const arrFunctionButtons = [8, 9, 13, 20, 16, 17, 18, 37, 38, 39, 40]; // Массив спец. символов
const arrKeyCode = arrKey.map((element) => element.keyCode); // Массив кодов кнопок

const body = document.querySelector('body');
// Отрисовка блока с клавиатурой
const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');

// Отрисовка текстАреа
const textareaBlock = document.createElement('div');
const textarea = document.createElement('textarea');
textareaBlock.classList.add('enter');
textarea.setAttribute('rows', '10');
textarea.setAttribute('cols', '100');
textarea.setAttribute('disabled', 'disabled');

// Отрисовочка языковой панельки
function initLngPannel() {
  const lngBlockCreate = document.createElement('div');
  lngBlockCreate.classList.add('changelang');
  body.append(lngBlockCreate);

  const lngBlock = document.querySelector('.changelang');
  const lngBlockCreateSwich = document.createElement('div');
  const lngBlockCreateRu = document.createElement('button');
  const lngBlockCreateEn = document.createElement('button');

  lngBlockCreateSwich.textContent = 'Language';
  lngBlockCreateRu.textContent = 'RUS';
  lngBlockCreateEn.textContent = 'ENG';

  lngBlockCreateSwich.className = 'lang-swich';
  lngBlockCreateRu.className = 'lang-btn lang-ru';
  lngBlockCreateEn.className = 'lang-btn lang-en active-lng';

  lngBlockCreateRu.setAttribute('data-lng', 'ru');
  lngBlockCreateEn.setAttribute('data-lng', 'en');

  lngBlock.append(lngBlockCreateSwich, lngBlockCreateRu, lngBlockCreateEn);
}
initLngPannel();

body.append(textareaBlock);
textareaBlock.append(textarea);
body.append(keyboard);

// Отрисовочка нашей клавиатурочки
function init() {
  let out = '';
  for (let i = 0; i < arrKey.length; i += 1) {
    if (arrFunctionButtons.includes(arrKey[i].keyCode)) {
      // Проверка на наличие в массиве спец.символов
      out += `<button class="k-key ${arrKey[i].key}" data-code="${arrKey[i].keyCode}">${arrKey[i].key}</button>`;
    } else if (arrKey[i].keyCode === 32) { // Проверка на наличие ПРОБЕЛА
      out += `<button class="k-key Space" data-code="${arrKey[i].keyCode}"> </button>`;
    } else {
      out += `<button class="k-key" data-code="${arrKey[i].keyCode}">${arrKey[i].key}</button>`;
    }
  }
  document.querySelector('.keyboard').innerHTML = out;
}
init();

// Важные перменные
const allKeyKeyboard = document.querySelectorAll('.k-key'); // Все кнопочки клавиатуры

// Функция подсветки выбранного языка
const lngBlockKey = document.querySelector('.changelang');
function toggleLng(event) {
  const activeButton = event.target;
  const buttonsLng = document.querySelectorAll('[data-lng]');
  if (event.target.dataset.lng === 'ru' || event.target.dataset.lng === 'en') {
    buttonsLng.forEach((element) => element.classList.remove('active-lng'));
    activeButton.classList.add('active-lng');
  }
}

// Событие выбора языка по клику
lngBlockKey.addEventListener('click', (event) => {
  toggleLng(event);
});

// Функция удаления подсветки клавишь
function deleteActiveClass(element) {
  for (let i = 0; i < element.length; i += 1) {
    element[i].classList.remove('active');
  }
}

// Функция удаления символа из текстарии
function deleteCharFromArea() {
  textarea.textContent = textarea.textContent.slice(0, -1);
}

// Функция удаления символа из текстарии
function toggleCapsLock() {
  const caps = document.querySelector('.CapsLock');
  caps.classList.toggle('caps-active');
  if (caps.classList.contains('caps-active')) {
    for (let i = 0; i < arrKey.length; i += 1) {
      allKeyKeyboard[i].textContent = arrKey[i].keyCaps;
    }
  } else {
    for (let i = 0; i < arrKey.length; i += 1) {
      allKeyKeyboard[i].textContent = arrKey[i].key;
    }
  }
}

// Функция добавления подсветки нажатым клавишам
function addActiveClassKeydown(event) {
  if (arrKeyCode.includes(event.keyCode)) {
    deleteActiveClass(allKeyKeyboard); // Очищаем подсветку со всех клавиш
    setTimeout(() => deleteActiveClass(allKeyKeyboard), 250); // Отключаем подсветку по таймингу
    const activeKey = document.querySelector(`[data-code="${event.keyCode}"]`);
    activeKey.classList.add('active');
  }
}

// Функция добавления подсветки кликнутым клавишам
function addActiveClassClick(event) {
  const targetKey = Number(event.target.dataset.code);
  if (arrKeyCode.includes(targetKey)) {
    deleteActiveClass(allKeyKeyboard); // Очищаем подсветку со всех клавиш
    setTimeout(() => deleteActiveClass(allKeyKeyboard), 250); // Отключаем подсветку по таймингу
    const activeKey = document.querySelector(`[data-code="${targetKey}"]`);
    activeKey.classList.add('active');
  }
}

// Функция добавления текста по нажатию клавиши
function addTextareaKeydown(event) {
  if (arrKeyCode.includes(event.keyCode) && !arrFunctionButtons.includes(event.keyCode)) {
    const myKey = document.querySelector(`[data-code="${event.keyCode}"]`);
    textarea.textContent += myKey.textContent;
  }
}

// Функция добавления текста по клику на клавишу
function addTextareaClick(event) {
  const targetKey = Number(event.target.dataset.code);
  if (arrKeyCode.includes(targetKey) && !arrFunctionButtons.includes(targetKey)) {
    const myKey = document.querySelector(`[data-code="${targetKey}"]`);
    textarea.textContent += myKey.textContent;
  }
}

// Событие нажатия на клавишу
document.addEventListener('keydown', (event) => {
  addActiveClassKeydown(event);
  addTextareaKeydown(event);
  if (event.keyCode === 8) { // отслеживаем Бекспейс
    deleteCharFromArea();
  }
  if (event.keyCode === 20) { // отслеживаем Капс
    toggleCapsLock();
  }
});

// Событие клика на клавишу
document.addEventListener('click', (event) => {
  addActiveClassClick(event);
  addTextareaClick(event);
  if (Number(event.target.dataset.code) === 8) {
    deleteCharFromArea();
  }
  if (Number(event.target.dataset.code) === 20) { // отслеживаем Капс
    toggleCapsLock();
  }
});

// let arr = [];

// document.addEventListener('keydown', (event) => {
//   let obj = {}
//   obj.key = event.key
//   obj.keyCode = event.keyCode
//   arr.push(obj)
//   console.log(arr)
// });
