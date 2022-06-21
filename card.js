export default class Card {
    constructor (someProduct) {
        this.state = someProduct;
        this.render();
    }

    getTemplate () {
      const result = `
        <div class="photo-wrapper" style="background-image: url(${this.state.images[0]});"></div>
        <div class="product-wrapper">
          <div class="description-wrapper">
            <div class="product-rating">
              <div class="rating">${this.state.rating}</div>
              <i class="bi bi-star"></i>
            </div>
            <div class="product-price">${this.state.price}</div>
          </div>
          <h5 class="product-title">
            ${this.state.title}
          </h5>
          <p class="product-kind">${this.state.category}</p>
        </div>
        <div class="wrapper-button">
        <button class="button" type="button">add to card</button>
        </div>
        `;
        return result;
      }

      render () {
        const element = document.createElement('div');
        element.classList.add('wrapper');
        element.innerHTML = this.getTemplate();
        this.element = element;
      }
    }