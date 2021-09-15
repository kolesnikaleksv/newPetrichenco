"use strict";
document.addEventListener('DOMContentLoaded', () => {

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
    
});
//Scripts and their execution time (setTimeout, setInterval)

// const timerId = setTimeout(function()  {
//     console.log('hello');
// }, 2000);

// const timerId = setTimeout(function(text)  {
//     console.log(text);
// }, 2000, 'hello');

// const timerId = setTimeout(logger, 2000);

// function logger() {
//     console.log('hello');
// }

// setTimeout(logger, 2000);// const timerId - это идентификатор определенного таймера

// function logger() {
//     console.log('hello');
// }

// clearInterval(timerId); // отключаем определенный таймер по его id

const button = document.querySelector('.btn_white');
let timerId,
    i = 0;

// button.addEventListener('click', () => {
//     timerId = setTimeout(logger, 2000);
//     //timerId = setInterval(logger, 2000);
// });

// clearInterval(timerId);

// function logger() {
//     console.log('hello');
// }
// button.addEventListener('click', () => {
//     //timerId = setTimeout(logger, 2000);
//     timerId = setInterval(logger, 2000);
// });

// function logger() {
//     if(i === 3) {
//         clearInterval(timerId);
//     }
//     console.log('hello');
//     i++;
// }
//рекурсивный вызов setTimeout
// let id = setTimeout(function log() {
//     console.log('hello');
//     id = setTimeout(log, 500);
// },500);
// простая анимация
function myAnimation() {
    const box = document.querySelector('.box');
    let pos = 0;
    const id = setInterval(frame, 10);
    function frame() {
        if(pos === 300) {
            clearInterval(id);
        } else {
            pos++;
            box.style.top = pos + 'px';
            box.style.left = pos + 'px';
        }
    }
}
button.addEventListener('click', myAnimation);