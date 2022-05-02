const body = document.querySelector('body');

// Отрисовка клавиатуры
const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');

// Отрисовка текстАреа
const textareaBlock = document.createElement('div');
const textarea = document.createElement('textarea');
textareaBlock.classList.add('enter');
textarea.setAttribute('rows', '10');
textarea.setAttribute('cols', '100');

body.append(textareaBlock);
textareaBlock.append(textarea);
body.append(keyboard);
