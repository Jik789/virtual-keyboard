import buttons from './buttons.js';
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

//основные переменные
console.log(buttons.en)



// document.addEventListener('keydown', (event) => {
//   let obj = {}
//   obj.key = event.key
//   obj.keyCode = event.keyCode
//   arr.push(obj)
//   console.log(arr)
// });

