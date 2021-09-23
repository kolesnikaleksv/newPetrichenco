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

    const getData = async (url) => { // now we dont need to send anything
        const res = await fetch(url); // у промиса который возвращается из fetch есть два свойства
        //.ok- мы что то получили, все ок либо не ок 
        //status - мы подаем на статус который вернул нам статус (200,300, 400...)
        if(!res.ok) {
            // мы можем принудительно выкинуть объект ошибки Error. создаем ее
            throw new Error(`Could not fetch ${url} status: ${res.status}`);
        }
        return await res.json();
    }
   getData('http://localhost:3000/menu')
   .then(data => {
       data.forEach(({img, altimg, title, descr, price})=> {
            new CreateMenu(img, altimg, title, descr, price, '.menu .container').render();
       });
   });
    // new CreateMenu(
    //     '"img/tabs/vegy.jpg"',
    //      'Меню "Фитнес"', 
    //      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
    //      '229'
    //      ).render();

    //  new CreateMenu(
    //      '"img/tabs/elite.jpg"', 
    //      'Меню “Премиум”', 
    //      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
    //      '550',
    //      'menu__item'
    //      ).render();
    // new CreateMenu(
    //     '"img/tabs/post.jpg"', 
    //     'Меню "Постное"', 
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ', 
    //     '430',
    //     'menu__item'
    //     ).render();

        // form

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    
    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: data
        })
        return await res.json();
    }
    
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
        
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            postData('http://localhost:3000/requests', json)
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

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));
});
