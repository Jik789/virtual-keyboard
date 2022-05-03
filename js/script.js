const arrKey = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 'Backspace', 'Tab', 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 'Enter', 'Caps', 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, 'Up', 92, 'Shift', 122, 120, 99, 118, 98, 110, 109, 44, 46, 47, 'Left', 'Down', 'Right', 'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Fn', 'Ctrl'];

function init() {
  let out = '';

  for (let i = 0; i < arrKey.length; i += 1) {
    if (typeof arrKey[i] === 'number') {
      out += `<button class="k-key">${String.fromCharCode(arrKey[i])}</button>`;
    } else {
      out += `<button class="k-key ${arrKey[i]}">${String(arrKey[i])}</button>`;
    }
  }
  document.querySelector('.keyboard').innerHTML = out;
}
init();
