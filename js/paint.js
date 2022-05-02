let body = document.querySelector('body');

// Отрисовка клавиатуры
let keyboard = document.createElement('div');
keyboard.classList.add('keyboard');

//Отрисовка текстАреа
let textareaBlock = document.createElement('div');
let textarea = document.createElement('textarea');
textareaBlock.classList.add('enter');
textarea.setAttribute('rows', '10');
textarea.setAttribute('cols', '100');

body.append(textareaBlock)
textareaBlock.append(textarea)
body.append(keyboard)
