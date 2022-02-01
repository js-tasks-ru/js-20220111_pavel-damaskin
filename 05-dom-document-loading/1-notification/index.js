export default class NotificationMessage {
  static previousNotification = null;

  constructor(message,
    {
      duration = 1000,
      type = '',
    } = {})
  {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.render();
  }

  get template() {
    return `
      <div class="notification ${this.type}" style="--value: ${this.duration / 1000 + 's'}">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type || 'Notification'}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `;
  }

  render(notificationContainer) {
    if (this.constructor.previousNotification) {
      this.constructor.previousNotification.remove();
    }

    const tmpElem = document.createElement('div');
    tmpElem.innerHTML = this.template;

    this.element = notificationContainer ? notificationContainer : tmpElem.firstElementChild;

    document.body.append(this.element);

    this.constructor.previousNotification = this.element;

    setTimeout(() => {
      this.destroy();
    }, this.duration);
  }

  show(notificationContainer) {
    this.render(notificationContainer);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
