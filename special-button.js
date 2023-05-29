class SpecialButton extends Key {
    constructor(name, action) {
        super(name, name, 0, { uppercase: false });
        this.action = action;
    }
}