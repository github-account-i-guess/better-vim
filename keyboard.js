class Keyboard {
    static getColorOffset(i, j, rowLength) {
        return -(i/4 + j/rowLength) * 50;
    }

    constructor(lowercaseKeys, uppercaseKeys, specialButtons) {
        this.lowercaseKeys = lowercaseKeys;
        this.uppercaseKeys = uppercaseKeys;

        this.uppercase = false;
        this.keys = [];
        
        // Lowercase Keys is a doubled array of strings
        lowercaseKeys.forEach((row, i) => {
            // Creates a row so that this.keys will become a doubled array of keys 
            const keyRow = [];
            this.keys.push(keyRow);

            const rowLength = row.length;

            row.forEach((lowercaseKey, j) => {
                const uppercaseKey = uppercaseKeys[i][j];
                keyRow.push(new Key(lowercaseKey, uppercaseKey, Keyboard.getColorOffset(i, j, rowLength), this));
            });
        });
        
        
        const { length } = lowercaseKeys;
        const { length: buttonLength } = specialButtons;
        specialButtons.forEach((button, i) => {
            button.colorOffset = Keyboard.getColorOffset(length, i, buttonLength);
        });

        this.keys.push(specialButtons);


        const htmlElement = document.createElement("div");
        // Bootstrap stuff so that we can add rows
        htmlElement.classList.add("container-fluid");

        this.keys.forEach(row => {
            const htmlRow = document.createElement("row");
            htmlRow.classList.add('row');

            // This is just a different way of going through each key and appendChilding one by one
            htmlRow.append(...row.map(key => {
                // Key referring to keyboard keys and not object keys just to be clear :/
                const { htmlElement } = key;
                return htmlElement;
            }));

            htmlElement.appendChild(htmlRow);
        });

        this.htmlElement = htmlElement;
    }

    update() {
        this.keys.forEach(row => {
            row.forEach(key => key.update());
        });
    }
}