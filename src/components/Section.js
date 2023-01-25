export class Section {
  constructor(renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }
  addItem(element) {
    this._container.prepend(element);
  }

  deleteItem(cardId) {
    document.getElementById(cardId).remove();
  }
  renderItems(cardsArray) {
    cardsArray.reverse().forEach((item) => {
      this._renderer(item);
    });
  }
}
