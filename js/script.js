import buttons from './buttons.js';
const arrKey = buttons.en; // Массив объектов с кнопочками
const arrFunctionButtons = [8, 9, 13, 20, 16, 17, 18, 32, 37, 38, 39, 40]; // Массив спец. символов
const arrKeyName = []; // Массив всех имен кнопочек
arrKey.forEach(element => arrKeyName.push(element.key));
const arrKeyCode = []; // Массив всех кодов кнопочек
arrKey.forEach(element => arrKeyCode.push(element.keyCode));


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

body.append(textareaBlock);
textareaBlock.append(textarea);
body.append(keyboard);


//Отрисовочка нашей клавиатурочки
function init() {
  let out = '';
  for (let i = 0; i < arrKey.length; i += 1) {
    if (arrFunctionButtons.includes(arrKey[i].keyCode)) { // Проверка на наличие в массиве спец.символов
      out += `<button class="k-key ${arrKey[i].key}" data-code="${arrKey[i].keyCode}">${arrKey[i].key}</button>`;
    } else {
      out += `<button class="k-key" data-code="${arrKey[i].keyCode}">${arrKey[i].key}</button>`;
    }
  }
  document.querySelector('.keyboard').innerHTML = out;
}
init();

//Важные перменные
const allKeyKeyboard = document.querySelectorAll('.k-key'); // Все кнопочки клавиатуры

// Функция удаления подсветки клавишь
function deleteActiveClass(element) {
  for (let i = 0; i < element.length; i += 1) {
    element[i].classList.remove('active');
  }
}

//Функция удаления символа из текстарии НЕ ПРОВЕРЕНО
function deleteCharFromArea() {
  textarea.textContent = textarea.textContent.slice(0, -1);
}

//Событие добавления подсветки нажатым клавишам
document.addEventListener('keydown', (event) => {
  if (arrKeyCode.includes(event.keyCode)) {
    deleteActiveClass(allKeyKeyboard); //Очищаем подсветку со всех клавиш
    setTimeout(() => deleteActiveClass(allKeyKeyboard), 250); //Отключаем подсветку по таймингу
    const activeKey = document.querySelector(`[data-code="${event.keyCode}"]`); 
    activeKey.classList.add('active');
  }
});

//Событие добавления подсветки нажатым клавишам
document.addEventListener('click', (event) => {
  const targetKey = Number(event.target.dataset.code)
  if (arrKeyCode.includes(targetKey)) {
    deleteActiveClass(allKeyKeyboard); //Очищаем подсветку со всех клавиш
    setTimeout(() => deleteActiveClass(allKeyKeyboard), 250); //Отключаем подсветку по таймингу
    const activeKey = document.querySelector(`[data-code="${targetKey}"]`); 
    activeKey.classList.add('active');
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

