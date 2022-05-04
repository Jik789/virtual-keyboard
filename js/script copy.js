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

// Отрисовка кнопок
const arrKey = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 'Backspace', 'Tab', 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 13, 'Caps', 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, 'Up', 92, 'Shift', 122, 120, 99, 118, 98, 110, 109, 44, 46, 47, 'Left', 'Down', 'Right', 'Ctrl', 'Alt', 32, 'Alt', 'Ctrl'];


function init() {
  let out = '';

  for (let i = 0; i < arrKey1.length; i += 1) {
    if (typeof arrKey[i] === 'number') { //Проверка на числовое значение элемента
      if (arrKey[i] === 13) {
        out += `<button class="k-key Enter" data-code="${arrKey[i]}">Enter</button>`; //Отлавливаем Энтр
      }
      else if (arrKey[i] === 32) {
        out += `<button class="k-key Space" data-code="${arrKey[i]}">Space</button>`; //Отлавливаем Пробел
      } else {
        out += `<button class="k-key" data-code="${arrKey[i]}">${String.fromCharCode(arrKey[i])}</button>`;
      }
    } else {
      out += `<button class="k-key ${arrKey[i]}" data-code="${arrKey[i]}">${String(arrKey[i])}</button>`;
    }
  }
  document.querySelector('.keyboard').innerHTML = out;
}
init();

// Работа с самой клавиатурой
const allKeyKeyboard = document.querySelectorAll('.k-key'); // Все кнопочки клавиатуры

// Функция удаления подсветки клавишь
function deleteActiveClass(element) {
  for (let i = 0; i < element.length; i += 1) {
    element[i].classList.remove('active');
  }
}

//Функция удаления символа из текстарии
function deleteCharFromArea() {
  textarea.textContent = textarea.textContent.slice(0, -1);
}

// Событие нажатия на кнопочку на клавиатуре
document.onkeypress = function keyboardClick(event) {
  if (typeof event.keyCode === 'number') {  // Проверка на обычный символ (включает пробел и энтер)
    const activeKey = document.querySelector(`[data-code="${event.keyCode}"]`);
    document.querySelectorAll(`[data="${event.keyCode}"]`);
    deleteActiveClass(allKeyKeyboard);
    setTimeout(() => deleteActiveClass(allKeyKeyboard), 250); //Отключаем подсветку по таймингу
    activeKey.classList.add('active');

    textarea.textContent += String.fromCharCode(event.keyCode);
  }
};

// Событие нажатия на ЛКМ по определенной кнопке. Мы не можем цепляться к ЧарКоду, по этому юзаем дата-атрибут
keyboard.addEventListener('click', (event) => {
  const keyCode = event.target.dataset.code
  if (keyCode) {
    if (!isNaN(Number(event.target.dataset.code))) { // Проверка на обычный символ (включает пробел и энтер)
      deleteActiveClass(allKeyKeyboard);
      setTimeout(() => deleteActiveClass(allKeyKeyboard), 250); //Отключаем подсветку по таймингу
      const activeKey = document.querySelector(`[data-code="${keyCode}"]`); 
      activeKey.classList.add('active');
      textarea.textContent += String.fromCharCode(keyCode)
    }
  }
});
