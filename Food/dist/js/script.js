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
});
//Document parametrs, windows and work with them.

const box = document.querySelector('.container');

// const width = box.clientWidth;
// const high = box.clientHeight;
// const width = box.offsetWidth;
// const high = box.offsetHeight;
// const width = box.scrollWidth;
// const high = box.scrollHeight;


 const body = document.getElementsByTagName('body')[0];
// const width = body.scrollWidth;
// const high = body.scrollHeight;

// body.addEventListener('click', () => {
//     // body.style.heigh = body.scrollHeight + "px";
//     // console.log(width, high);
//     console.log(body.scrollTop);

// });
// console.log(body.getBoundingClientRect());
//console.log(width, high);
const style = window.getComputedStyle(body);

// console.log(style);
// console.log(style.display);
// обращаться к document можно только через documentElement а иначе у него нет таких
// методов
// console.log(document.scrollTop);// не получится.
// console.log(document.documentElement.scrollTop);// correct spelling
// для работы в консоли эти команды работают только там 
// первая от куда(с места нахождения пользователья) и куда отмотать
console.log(window.scrollBy(0, 400));
// вторая это куда мы будем начать с верха
console.log(window.scrollTo(0, 400));