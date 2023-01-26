export class Section {
  constructor(renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }
  addItem(element) {
    this._container.prepend(element);
  }
  renderItems(cardsArray) {
    cardsArray.reverse().forEach((item) => {
      this._renderer(item);
    });
  }
}
