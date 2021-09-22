"use strict";
document.addEventListener('DOMContentLoaded', () => {

        //Tabs

    let tabsParent = document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent');


    function hideTabsContent() {
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });

        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
    }
    hideTabsContent();

    function showTabsContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    showTabsContent();

    tabsParent.addEventListener('click', e => {
        e.preventDefault();

        if(e.target && e.target.classList.contains('tabheader__item')) {
            const target = e.target;

            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            })            
        }
    })
    
    //Timer

    const deadLine = '2021-09-30';

    function getTimeRemaining(endTime) {
        let t =  Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(t/(1000 * 60 * 60 * 24)),
            hours = Math.floor((t/(1000 * 60 * 60)) % 24),
            minutes = Math.floor((t/1000 / 60) % 60),
            seconds = Math.floor((t/1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZero(num) {
        if(num >= 0 && num < 10) {
            num = `0${num}`;
            return num;
        } else if(num < 0) {
            return num = '00';
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
              
        updateClock(); // so as not to wait 1000 milliseconds

        function updateClock() {
            let t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            
            if(t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadLine);

    //Modal window

    const btnOpen = document.querySelectorAll('[data-modal]'),
          btnClose = document.querySelector('[data-close]'),
          modalWindow = document.querySelector('.modal');


    function openModal() {
        modalWindow.classList.add('show');// use the classes
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';// remove scrolling
    }
    
    function closeModal() {
        modalWindow.classList.remove('show');
        modalWindow.classList.add('hide');
        document.body.style.overflow = '';// return scrolling
        clearInterval(timerModal);
    }
    
    btnOpen.forEach(item => {
        item.addEventListener('click', openModal);
    });

    modalWindow.addEventListener('click', (e) => {
        let target = e.target;
        if(target == modalWindow || target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code == 'Escape' && modalWindow.classList.contains('show')) {
            closeModal();
        }
    });
   
    const timerModal = setTimeout(openModal, 50000);

    function openModalOffset() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', openModalOffset);
        }
    }
    window.addEventListener('scroll', openModalOffset);

    // A Menu

    const menu = document.querySelector('.menu'),
          container = menu.querySelector('.container');
          

    class CreateMenu {
        constructor(img,subtitle, descr,price, ...classes) {
            this.img = img;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
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
                <img src=${this.img} alt="vegy">
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            container.append(element);
        }
    }
    new CreateMenu(
        '"img/tabs/vegy.jpg"',
         'Меню "Фитнес"', 
         'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
         '229'
         ).render();

     new CreateMenu(
         '"img/tabs/elite.jpg"', 
         'Меню “Премиум”', 
         'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
         '550',
         'menu__item'
         ).render();
    new CreateMenu(
        '"img/tabs/post.jpg"', 
        'Меню "Постное"', 
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ', 
        '430',
        'menu__item'
        ).render();

        // form

        const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    
    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
        
            

            // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            const formData = new FormData(form);

            

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            

            fetch('server.php', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(object)
            })
            .then(date => date.text()) // модифицируем обєкт для вывода в консоль
            .then(date => {
                console.log(date);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    // nice user notification

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times; </div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
});
// Array iteration methods
// в отличие от forEach() все последующие методы возвращают новый массив
// filter();
// const name = ['alex', 'kirill', 'nika', 'lyuba', 'box'];
// const shortName = name.filter(name => {
//     return name.length < 5;// условия можно задавать любые
// });
// console.log(shortName);

// map() этот метод позволяет изменить каждый элемент массива

// const answer = ['Alex', 'Kirill', 'Nika', 'Lyuba', 'box'];
// const lowerName = answer.map(item =>  item.toLowerCase());

// console.log(lowerName);
// этот метод часто используют для трансформации данных

// every/some
// some() если хотя бы один элемент подходит по параметрам он вернет true
// every() если все элементы подходят по параметрам тогда вернет true
// const answer = ['Alex', 'Kirill', 'Nika', 'Lyuba', 'box', 2];
// const lowerName = answer.some(item =>  item.length > 3);
// //or const lowerName = answer.some(item => typeof(item) === 'number');

// console.log(lowerName);
// ответ будет true
// если мы используем every() - ответ будет false

// reduce() служит для схлопывания массива в одно
// const answer = ['Alex', 'Kirill', 'Nika', 'Lyuba', 'box', 2];
// const lowerName = answer.reduce((sum, item) =>  sum + ', ' + item); //вернет строку
// const lowerName = answer.reduce((sum, item) =>  `${sum}, ${item}`); //вернет строку
//можно добавить через запятую начальное значение и оно добавится
// const lowerName = answer.reduce((sum, item) =>  sum + item, 3);


// const answer = [8, 9, 4, 5, 5, 2];
// const lowerName = answer.reduce((sum, item) =>  item * sum);

// console.log(lowerName);

// entries() метод глобального объекста который превращает объект в матрицу
// const obj = {
//     name: 'alex',
//     dog: 'boxer',
//     cat: 'miu',
//     alex: 'person'
// }

// const newArr = Object.entries(obj);
// console.log(newArr);

// chain of methods

const obj = {
    name: 'alex',
    kir: 'person',
    dog: 'boxer',
    cat: 'miu',
    alex: 'person'
}

const newArr = Object.entries(obj)
.filter(item => item[1] === "person")// вернет только єлементы у которых второй элем 'person'
.map(item => item[0]);
console.log(newArr);


