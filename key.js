class Key {
    constructor(lowercase, uppercase, colorOffset, keyboard) {
        this.lowercase = lowercase;
        this.uppercase = uppercase;
        this.colorOffset = colorOffset;
        this.keyboard = keyboard;
        // Creates a button
        const htmlElement = document.createElement("button");
        // Bootstrap stuff (text-center because that's how you center text in bootstrap)
        htmlElement.classList.add('btn', 'btn-dark',"text-center", 'text-light', "col");

        // Setting background color
        htmlElement.style.borderColor = this.color;
        htmlElement.style.borderWidth = '5px';
        // Also self explanatory
        htmlElement.innerHTML = this.key;

        htmlElement.addEventListener("click", _ => {
            this.action();
        });

        this.htmlElement = htmlElement;
    }

    action() {
        // const previousText = textValue.slice(0, textPointer);
        // const afterText = textValue.slice(textPointer, textValue.length);

        // textValue = previousText + this.key + afterText;
        textValue = textValue.insert(textPointer, this.key);
        
        textPointer ++;
    }

    get color() {
        // Since hsl goes in a circle, this will create a rainbow
        // the color offset is so that each key has a different color
        // and then it's mod 360 so that it will repeat once it goes over 360 (hue is an angle between 0 - 360 (ew use radians :/))
        return `hsl(${Math.floor((this.colorOffset + Date.now() * 360 /10000) % 360)}, 100%, 45%)`;
    }

    get key() {
        // Gets the uppercase or lowercase based off the parent keyboard class
        const { uppercase } = this.keyboard;
        return uppercase ? this.uppercase : this.lowercase;
    }

    update() {
        this.htmlElement.style.borderColor = this.color;
        this.htmlElement.innerHTML = this.key;
    }
}