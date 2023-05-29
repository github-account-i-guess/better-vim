const text = document.querySelector("#text");
const header = document.querySelector("#better-vim");
const keyboardContainer = document.querySelector("#keyboard-container");

let textPointer = 0;
let textValue = ``;

String.prototype.insert = function (index, str) {
    const previousText = this.slice(0, index);
    const afterText = this.slice(index, this.length);

    return previousText + str + afterText;
}

const splitAll = arr => arr.map(str => {
    return str.split('');
});

const lowerCaseKeys = splitAll([
    `\`1234567890-=`,
    `qwertyuiop[]\\`,
    `asdfghjkl;'`,
    `zxcvbnm,./`,
]);

const upperCaseKeys = splitAll([
    `1!@#$%^&*()_+`,
    `QWERTYUIOP{}|`,
    `ASDFGHJKL:"`,
    `ZXCVBNM<<>?`
]);

const specialButtons = [
    new SpecialButton('Run!', _ => {
        eval(textValue);
    }),
    new SpecialButton('Caps', _ => {
        keyboard.uppercase = !keyboard.uppercase;
    }),
    new SpecialButton("Back", _ => {
        if (textPointer <= 0) return;

        const before = textValue.slice(0, textPointer - 1);
        const after = textValue.slice(textPointer, textValue.length);
        textValue = before + after;
        textPointer --;
    }),
    new SpecialButton("  ", _ => {
        textValue = textValue.insert(textPointer, ' ');
        textPointer ++;
    }),
    new SpecialButton("<", _ => {
        if (textPointer <= 0) return;
        textPointer --;
    }),
    new SpecialButton(">", _ => {
        if (textPointer >= textValue.length) return;
        textPointer ++;
    }),
];

const keyboard = new Keyboard(lowerCaseKeys, upperCaseKeys, specialButtons);

const { htmlElement } = keyboard;
keyboardContainer.appendChild(htmlElement);

const { height } = htmlElement.getBoundingClientRect();

text.style.height = (innerHeight - height - header.getBoundingClientRect().height - 50) + "px";

// Reupdating the keyboard every 250ms
setInterval(_ => {
    keyboard.update();
    const textCopy = textValue.slice();
    const showCursor = Math.floor(Date.now()/530) % 2 == 0;
    text.innerHTML = textCopy.insert(textPointer, showCursor ? "|" : " ");
}, 100);
