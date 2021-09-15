'use strict';

// classlist and delegation of events
let buttons = document.querySelectorAll('button'),
    wrapper = document.querySelector('.btn-block');


// console.log(buttons[0].classList.length);
//  console.log(buttons[0].classList.item(0)); // позволяет получить класс по индексу
// console.log(buttons[0].classList.remove('blue'));
// console.log(buttons[0].classList.add('red'));
// console.log(buttons[0].classList.toggle('red')); // если класс есть то он будет убран, если нет, то будет добавлен
// в методи remove() и add() можно добавлять несколько классов через запятую ('red', 'blue' и т.д.)
//console.log(buttons[1].classList.contains('red'));//проверяем на наличие класса
// if(buttons[0].classList.contains('red')) {
//     console.log('it has');
// }
buttons[0].addEventListener('click', () => {
    // if(!buttons[1].classList.contains('red')) {
    //     buttons[1].classList.add('red');
    // } else {
    //     buttons[1].classList.remove('red');
    // }
    buttons[1].classList.toggle('red');
});
// делегирование
// wrapper.addEventListener('click', (e) => {
//     console.dir(e.target);
//     if(e.target && e.target.tagName == "BUTTON") {
//         console.log('hi');
//     }
// });
// wrapper.addEventListener('click', (e) => {
//     console.dir(e.target);
//     if(e.target && e.target.classList.contains('red')) {
//         console.log('hi');
//     }
// });
buttons.forEach(item => {               // это не делегирование и этот обработчик не с
    item.addEventListener('click', () => { // не сработает на новых кнопках/элементах
        console.log('hello');
    })
})
let btn = document.createElement('button')
btn.classList.add('red');
wrapper.append(btn);