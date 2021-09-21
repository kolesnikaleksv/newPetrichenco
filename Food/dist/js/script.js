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
        if(target == modalWindow || target == btnClose) {
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
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    
    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.appendChild(statusMessage);
        
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }

});

// Promice (ES6)
// we can use the callback function to create the execution order:

// console.log('Запрос обрабатывается...');

// setTimeout(() => {
//     console.log('Подготовка данных...');

//     const goods = {
//         name: 'TV',
//         price: 2000
//     };
//     setTimeout(() => {
//         goods.status = 'ordes';
//         console.log(goods);
//     }, 2000);
// }, 2000);

//but it can lead us to a callback hell. So we can use the built in Promise object.

// const reg = new Promise();

//we insert a callback function in this object, which has two arguments(which are the
// methods of this Promise)

// const reg = new Promise((resolve, reject) => {

// });

// const reg = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('Подготовка данных...');
    
//         const goods = {
//             name: 'TV',
//             price: 2000
//         };
//         setTimeout(() => {
//             goods.status = 'ordes';
//             console.log(goods);
//         }, 2000);
//     }, 2000);
// });

// change the second timeout to - resolve. And send an goods object.
// console.log('Запрос обрабатывается...');

// const reg = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('Подготовка данных...');
    
//         const goods = {
//             name: 'TV',
//             price: 2000
//         };
//         resolve(goods);
//     }, 2000);
// });

// reg.then((data) => {
//     setTimeout(() => {
//         console.log('Данные получены...');
//         data.status = 'ordes';
//         console.log(data);
//     }, 2000);
// });

// let's put another Promise insert
// console.log('Запрос обрабатывается...');

// const reg = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('Подготовка данных...');
    
//         const goods = {
//             name: 'TV',
//             price: 2000
//         };
//         resolve(goods);
//     }, 2000);
// });

// reg.then((data) => {
//     const reg2 = new Promise((resolve, reject) => {
//         setTimeout(() => {
//                     data.status = 'ordes';
//                     resolve(data);
//         }, 2000);
//     });
//     reg2.then((data) => {
//         console.log(data);
//     });
// });

// to buid a chain of Promises we can return a new Promise
// console.log('Запрос обрабатывается...');

// const reg = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('Подготовка данных...');
    
//         const goods = {
//             name: 'TV',
//             price: 2000
//         };
//         resolve(goods);
//     }, 2000);
// });

// reg.then((data) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//                     data.status = 'ordes';
//                     resolve(data);
//         }, 2000);
//     }); 
// }).then((data) => {
//     console.log(data);
// });

// From such Promises we can return not only Promises
// let's modify the some data

// console.log('Запрос обрабатывается...');

// const reg = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('Подготовка данных...');
    
//         const goods = {
//             name: 'TV',
//             price: 2000
//         };
//         resolve(goods);
//     }, 2000);
// });

// reg.then((data) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//                     data.status = 'ordes';
//                     resolve(data);
//         }, 2000);
//     });
// }).then((data) => {
//     data.someData = true; // modiry
//     return data;          // return a new data
// }).then(data => {
//     console.log(data);
// });

// consider the reject() function

// console.log('Запрос обрабатывается...');

// const reg = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('Подготовка данных...');
    
//         const goods = {
//             name: 'TV',
//             price: 2000
//         };
//         reject();       // let's insert here the reject() function here instead resolve()
//     }, 2000);                // and nothing needs to be transfered
// });

// reg.then((data) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//                     data.status = 'ordes';
//                     resolve(data);
//         }, 2000);
//     });
// }).then((data) => {
//     data.someData = true; 
//     return data;          
// }).then(data => {
//     console.log(data);
// }).catch(() => {
//     console.error('Что то пошло не так!');
// });

// now we consider the finally() function
// console.log('Запрос обрабатывается...');

// const reg = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('Подготовка данных...');
    
//         const goods = {
//             name: 'TV',
//             price: 2000
//         };
//         resolve(goods);
//     }, 2000);
// });

// reg.then((data) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//                     data.status = 'ordes';
//                     resolve(data);
//         }, 2000);
//     });
// }).then((data) => {
//     data.someData = true; 
//     return data;          
// }).then(data => {
//     console.log(data);
// }).catch(() => {
//     console.error('Что то пошло не так!');
// }).finally(() => {// we insert code into this function that cleans all forms and so on
//     console.log('Все пройшло не погано...');
// });

const test = time => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), time);
    });
}
test(1000).then(() => console.log('1000 ms'));
test(2000).then(() => console.log('2000 ms'));
