class Tooltip {
  static instance = null;

  content = null;

  constructor() {
    this.tooltipHandler = this.tooltipHandler.bind(this);

    if (!Tooltip.instance) {
      Tooltip.instance = this;
    }

    return Tooltip.instance;
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
    const shift = 5;
    const xPointerCoord = e.clientX + shift;
    const yPointerCoord = e.clientY + shift;

    this.element.style.left = `${xPointerCoord}px`;
    this.element.style.top = `${yPointerCoord}px`;
  }

  attachEvents() {
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
