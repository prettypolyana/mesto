export default class Section {
    constructor(cards, renderer, containerSelector) {
        this._cards = cards;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._cards.forEach(this._renderer);
    }

    addItem(element) {
        this._container.prepend(element);
    }
}
