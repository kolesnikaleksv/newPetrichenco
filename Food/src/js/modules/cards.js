import {getData} from '../services/services';

function cards() {
    // A Menu

    const menu = document.querySelector('.menu');
          

    class CreateMenu {
        constructor(img,altimg, subtitle, descr,price, parentSelector, ...classes) {
            this.img = img;
            this.subtitle = subtitle;
            this.altimg = altimg;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUah();
        }

        changeToUah() {
            return this.price = Math.floor(this.price / this.transfer);
        }
        
        render() {
            let element = document.createElement('div');
            if(this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(newClass => element.classList.add(newClass));
            }
            
            element.innerHTML = `
                <img src=${this.img} alt=${this.altimg}>
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

   getData('http://localhost:3000/menu')
   .then(data => {
       data.forEach(({img, altimg, title, descr, price})=> {
            new CreateMenu(img, altimg, title, descr, price, '.menu .container').render();
       });
   });
}

export default cards;