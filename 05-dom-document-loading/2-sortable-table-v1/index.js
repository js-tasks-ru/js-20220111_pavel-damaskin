export default class SortableTable {
  sortedData = [];
  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.sortedData = this.data;

    this.render();
  }

  render() {
    const tmpElement = document.createElement('div');

    tmpElement.innerHTML = this.template;

    this.element = tmpElement.firstElementChild;

    this.fillSubElements();

    this.buildHeader();
    this.buildBody();
  }

  get template() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row"></div>

          <div data-element="body" class="sortable-table__body"></div>
        </div>
      </div>
    `;
  }

  fillSubElements() {
    const sections = this.element.querySelectorAll('[data-element]');

    sections.forEach((section) => {
      this.subElements[section.dataset.element] = section;
    });
  }

  buildHeader() {
    this.subElements['header'].innerHTML = this.headerConfig.map((field) => {
      const renderDefaultSortType = '';

      return `
        <div class="sortable-table__cell" data-id="${field.id}" data-sortable="${field.sortable}" ${renderDefaultSortType}>
          <span>${field.title}</span>
        </div>
      `;
    }).join('');
  }

  buildBody() {
    this.subElements['body'].innerHTML = this.sortedData.map((product) => {
      let productMarkup = `<a href="/products/${product.id}" class="sortable-table__row">`;

      let productRow = this.headerConfig.map((field) => {
        if (field.id === 'images') {
          return field.template(product.images);
        }

        return `<div class="sortable-table__cell">${product[field.id]}</div>`;
      }).join('');

      productMarkup += productRow;

      productMarkup += `</a>`;

      return productMarkup;
    }).join('');
  }

  sort(fieldId, order = 'asc') {
    switch (fieldId) {
    case 'title':
      this.sortedData = this.data.sort((a, b) => {
        if (order === 'asc') {
          return a[fieldId].localeCompare(b[fieldId], ['ru', 'en'], {
            caseFirst: 'upper',
          });
        }

        if (order === 'desc') {
          return b[fieldId].localeCompare(a[fieldId], ['ru', 'en'], {
            caseFirst: 'upper',
          });
        }
      });
      break;
    case 'quantity':
    case 'price':
    case 'sales':
      this.sortedData = this.data.sort((a, b) => {
        if (order === 'asc') {
          return a[fieldId] - b[fieldId];
        }

        if (order === 'desc') {
          return b[fieldId] - a[fieldId];
        }
      });
      break;
    }

    this.element.querySelector('[data-element="body"]');
    this.buildBody();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

