class Tooltip {
  static instance = null;

  content = null;

  constructor() {
    if (!this.constructor.instance) {
      this.constructor.instance = this;
    }

    return this.constructor.instance;
  }

  initialize() {
    this.attachEvents();
  }

  render() {
    const tmpElem = document.createElement('div');

    tmpElem.innerHTML = this.template;

    this.element = tmpElem.firstElementChild;

    document.body.append(this.element);
  }

  get template() {
    return `
      <div class="tooltip">${this.content}</div>
    `;
  }

  tooltipHandler({ target }) {
    const tooltipTrigger = target.closest('[data-tooltip]');

    if (!tooltipTrigger) {
      return;
    }

    this.content = tooltipTrigger.dataset.tooltip;
    this.render();

    this.setTooltipCoords = this.setTooltipCoords.bind(this);

    tooltipTrigger.addEventListener('pointermove', this.setTooltipCoords);

    tooltipTrigger.addEventListener('pointerout', (e) => {
      this.remove();
      e.currentTarget.removeEventListener('pointermove', this.setTooltipCoords);
    }, {
      once: true,
    });
  }

  setTooltipCoords(e) {
    const xPointerCoord = e.clientX + 5;
    const yPointerCoord = e.clientY + 5;

    this.element.style.left = `${xPointerCoord}px`;
    this.element.style.top = `${yPointerCoord}px`;
  }

  attachEvents() {
    this.tooltipHandler = this.tooltipHandler.bind(this);

    document.addEventListener('pointerover', this.tooltipHandler);
  }

  detachEvents() {
    document.removeEventListener('pointerover', this.tooltipHandler);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.detachEvents();
  }
}

export default Tooltip;
