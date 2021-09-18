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
});
// The constructions function

// const num = new Number(3);//outdated syntax
// console.log(num);

//The modern way
// function User(name, id) {
//     this.name = name;
//     this.id = id;
//     this.human = true;
//     this.hello = function() {
//         console.log(`hello i am ${this.name} my age is ${this.id} Am i a human? ${this.human}`)
//     }
// }

// const alex = new User('alex', 20);
// const kir = new User('kir', 9);

// console.log(alex.hello(), kir.hello());
// // У цей конструктор можна додати і інші функціі за рахунок наслідування
// User.prototype.exit = function() {
//     console.log(`${this.name} logged out`);
// }
// alex.exit();
// kir.exit();
// зараз у js користуються тільки классами - синтаксичний цукор



// lesson two
// Контекст вызова This

// function showThis(a,b) {
//     console.log(this);
// }
// showThis();
// 1) В обычной функции this = window при "use strict"; = undefined
// function showThis(a,b) {
//     console.log(this);
//     function sum() {
//         console.log(this);
//         return this.a + this.b;
//     }
//     console.log(sum());
// }
// showThis(5,4);
// ничего не получится, ответ один undefined что бы случились вычисления, надо использо
//вать замыкание, тогда переменные будут искаться выше т.е. убрать this
// function showThis(a,b) {
//     console.log(this);
//     function sum() {
//         console.log(this);
//         return a + b;
//     }
//     console.log(sum());
// }
// showThis(4,5);
//2) Контекст вызова метода внутри объекта будет иметь контекстом - сам объект

// const obj = {
//     'name': 'alex',
//     'age': 25,
//     sum:function  () {
//         console.log(this);
//     }
// }
// obj.sum();
// если мы вызовем внутри метода функцию то она уже не будет иметь контекста
// const obj = {
//     'name': 'alex',
//     'age': 25,
//     sum:function  () {
//         function hello() {
//             console.log(this);
//         }
//         hello();
//     }
// }
// obj.sum();
// 3) this в конструкторах и классах это новый экзэмпляр объекта
// function User(name, id) {
//     this.name = name;
//     this.id = id;
//     this.human = true;
//     this.hello = function() {
//         console.log(this);
//         console.log(`hello i am ${this.name} my age is ${this.id} Am i a human? ${this.human}`)
//     }
// }

// const alex = new User('alex', 20);
// const kir = new User('kir', 9);

// console.log(alex.hello(), kir.hello());
// Можно передать контекст в функцию с помощью метода call() и apply()
// function sayName() {
//     console.log(this);
//     console.log(this.name);
// }

// const obj = {
//     'name': 'alex'
// }

// sayName.call(obj);
// sayName.apply(obj);
// разница между ними только в записи аргументов при передаче аргументов
// function sayName(surname) {
//     console.log(this);
//     console.log(this.name + surname);
// }

// const obj = {
//     'name': 'alex'
// }

// sayName.call(obj, 'smith'); //все последующие аргументы через запятую
// sayName.apply(obj, ['smith']);// все аргументы в виде массива
// есть еще одни метод bind() но он уже создает новую ф-цию и под нее подвязывает контекст
// function count(num) {
//     return this*num;
// }

// const double = count.bind(2);
// // т.е. теперь double это новая фция с новый контекстом 2 который передается в фцию count
// console.log(double(3));
// console.log(double(9));
//т.е. 4) Ручная привязка this это - call() apply() bind()

//for example
//рассмотрим на примере событий
const btn = document.querySelector('.btn_min');

// btn.addEventListener('click', function() {
//     console.log(this);
//     this.style.color = 'red';
// });
//внутри событий в обычной callback функции контекст(this) будет равент e.target т.е.
//самому єлементу на котором было вызвано событие

// разберем стрелочную фцию у которой нет своего контекста вызова и она берет его у
// своего родителя
// const obj = {
//     'name': 'alex',
//     sayName: function() {
//         console.log(this);
//         const say = () => {
//             console.log(this);
//             const bay = () => {
//                 console.log(this.name);
//             }
//             bay();
//         }
//         say();
//     }
// }
// obj.sayName();
//поскольку стрелочная фция берет контекст у родителя то все они сработают нормально
// и this/контекстом будет сам объект. потому как метода объекта имеет контекстом сам
// объект

// синтаксис стрелочных фций
// const double = (a) => {
//     return a*2;
// }
// // равно нижней записи
// const double = (a) => a*2;
// равно нижней записи
// const double = a => a*2;

// console.log(double(3));
// это кстати та фция с которой мы начинали.

// теперь контекст вызова стрелочных фций в обработчике событий
// btn.addEventListener('click', () => {
//     console.log(this);
//     this.style.color = 'red';
// });
// в обработчиках событий контекст будет потерян. Потому как только обычная фция имеет
// в них контекст.
// поэтому в обработчики мы передаем event и вместо this цепляем все к e.target
btn.addEventListener('click', (e) => {
    //console.log(this);
    e.target.style.color = 'red';
});