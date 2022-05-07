import buttons from './buttons.js';

let arrKey = buttons.en; // Массив объектов с кнопочками
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
// textarea.setAttribute('disabled', 'disabled');

// Отрисовочка языковой панельки
function initLngPannel() {
  const lngBlockCreate = document.createElement('div');
  lngBlockCreate.classList.add('changelang');
  body.append(lngBlockCreate);

  const lngBlock = document.querySelector('.changelang');
  const lngBlockCreateSwich = document.createElement('div');
  const lngBlockCreateRu = document.createElement('button');
  const lngBlockCreateEn = document.createElement('button');

  lngBlockCreateSwich.textContent = 'Переключение языка Ctrl+Alt (или кнопочки правее)';
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

const lngBlockKey = document.querySelector('.changelang');

// Функция смены языка по нажатию комбинации Ctr+Alt
function changeLngKeydown() {
  if (arrKey === buttons.ru) {
    arrKey = buttons.en;
  } else {
    arrKey = buttons.ru;
  }
  init();
}

// Функция изменения подсветки выбранного языка по нажатию комбинации Ctr+Alt
function toggleLngKeydown() {
  const buttonsLng = document.querySelectorAll('[data-lng]');
  const buttonsLngRu = document.querySelector('.lang-ru');
  const buttonsLngEn = document.querySelector('.lang-en');

  if (arrKey === buttons.ru) {
    buttonsLng.forEach((element) => element.classList.remove('active-lng'));
    buttonsLngRu.classList.add('active-lng');
  } else {
    buttonsLng.forEach((element) => element.classList.remove('active-lng'));
    buttonsLngEn.classList.add('active-lng');
  }
}

// Функция изменения подсветки выбранного языка по клику
function toggleLngClick(event) {
  const activeButton = event.target;
  const buttonsLng = document.querySelectorAll('[data-lng]');
  if (event.target.dataset.lng === 'ru' || event.target.dataset.lng === 'en') {
    buttonsLng.forEach((element) => element.classList.remove('active-lng'));
    activeButton.classList.add('active-lng');
  }
}

// Функция смены языка по клику мышки
function changeLngClick() {
  const activeLngKey = document.querySelector('.lang-en');
  if (activeLngKey.classList.contains('active-lng')) {
    arrKey = buttons.en;
  } else {
    arrKey = buttons.ru;
  }
  init();
}

// Функция удаления подсветки клавишь
function deleteActiveClass(element) {
  for (let i = 0; i < element.length; i += 1) {
    element[i].classList.remove('active');
  }
}

// Функция удаления символа из текстарии
function deleteCharFromArea() {
  textarea.value = textarea.value.slice(0, -1);
}

// Функция удаления символа из текстарии
function toggleCapsLock() {
  const allKeyKeyboard = document.querySelectorAll('.k-key'); // Все кнопочки клавиатуры
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
  const allKeyKeyboard = document.querySelectorAll('.k-key'); // Все кнопочки клавиатуры
  if (arrKeyCode.includes(event.keyCode)) {
    deleteActiveClass(allKeyKeyboard); // Очищаем подсветку со всех клавиш
    setTimeout(() => deleteActiveClass(allKeyKeyboard), 250); // Отключаем подсветку по таймингу
    const activeKey = document.querySelector(`[data-code="${event.keyCode}"]`);
    activeKey.classList.add('active');
  }
}

// Функция добавления подсветки кликнутым клавишам
function addActiveClassClick(event) {
  const allKeyKeyboard = document.querySelectorAll('.k-key'); // Все кнопочки клавиатуры
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
    textarea.value += myKey.textContent;
  }
  if (event.keyCode === 9) {  
    textarea.value += "\t"
  }
  if (event.keyCode === 13) {
    textarea.value += "\n"
  }
  textarea.focus()
}

// Функция добавления текста по клику на клавишу
function addTextareaClick(event) {
  const targetKey = Number(event.target.dataset.code);
  if (arrKeyCode.includes(targetKey) && !arrFunctionButtons.includes(targetKey)) {
    const myKey = document.querySelector(`[data-code="${targetKey}"]`);
    textarea.value += myKey.textContent;
  }
  if (targetKey === 9) {  
    textarea.value += "\t"
  }
  if (targetKey === 13) {
    textarea.value += "\n"
  }
  textarea.focus()
}

// Событие нажатия на клавишу
document.addEventListener('keydown', (event) => {
  event.preventDefault();
  addActiveClassKeydown(event);
  addTextareaKeydown(event);
  if (event.keyCode === 8) { // отслеживаем Бекспейс
    deleteCharFromArea();
  }
  if (event.keyCode === 20) { // отслеживаем Капс
    toggleCapsLock();
  }
  if (event.ctrlKey && event.altKey) { 
    // отслеживаем переключения языка (у кнопочек под определенным keyCode есть тригеры которые могут иметь true при нажатой кнопке)
    changeLngKeydown();
    toggleLngKeydown();
  }
});

// Событие клика на клавишу
document.addEventListener('click', (event) => {
  event.preventDefault();
  addActiveClassClick(event);
  addTextareaClick(event);
  if (Number(event.target.dataset.code) === 8) { // отслеживаем Бекспейс
    deleteCharFromArea();
  }
  if (Number(event.target.dataset.code) === 20) { // отслеживаем Капс
    toggleCapsLock();
  }
  if (event.target.dataset.lng === 'ru' || event.target.dataset.lng === 'en') { // отслеживаем переключения языка
    toggleLngClick(event);
    changeLngClick();
  }
  setLocalStorage()
});

//Функция срхранения выбранного языка
function setLocalStorage() {
  if (arrKey === buttons.en) {
    localStorage.setItem('lng', 'en');
  }
  else {
    localStorage.setItem('lng', 'ru');
  }
}

//Функция подгрузки выбранного языка при загрузке страницы
function getLocalStorage() {
  let chooseLng = localStorage.getItem('lng');
  if (chooseLng !== null) {
    if (chooseLng === 'en') {
      arrKey = buttons.ru;
    } else {
      arrKey = buttons.en;
    }
    changeLngKeydown()
    toggleLngKeydown()
  }
}
window.addEventListener('load', getLocalStorage);

// let arr = [];

// document.addEventListener('keydown', (event) => {
//   let obj = {}
//   obj.key = event.key
//   obj.keyCode = event.keyCode
//   arr.push(obj)
//   console.log(arr)
// });