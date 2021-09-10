'use strict';

// const movieDB = {
//     movies: [
//         "Логан",
//         "Лига справедливости",
//         "Ла-ла лэнд",
//         "Одержимость",
//         "Скотт Пилигрим против..."
//     ]
// };

// let adv = document.querySelectorAll('.promo__adv img'),
//     genre = document.querySelectorAll('.promo__genre'),
//     promoBg = document.querySelectorAll('.promo__bg'),
//     list = document.querySelectorAll('.promo__interactive-list'),
//     movieName = list[0].querySelectorAll('.promo__interactive-item');

// let arr = [];
// for(let i = 0; i < movieDB.movies.length; i++) {
//     arr[i] = movieDB.movies[i].toLowerCase();
//     arr.sort();
// }

// arr.forEach((item, i) => {
//     movieName[i].textContent = `${i + 1}. ${item}`;
// });

// adv.forEach(item => {
//     item.remove();
// });

// genre[0].textContent = 'Драма';
// promoBg[0].style.backgroundImage = 'url("img/bg.jpg")';



// lesson working with events

// let btn = document.querySelectorAll('.add button')[0],
//     btns = document.querySelectorAll('.add');

// // btn.addEventListener('click', (e) => {
// //     btn.remove();
// // });
// let i = 0;
// const deleteElement = function(e) {
//     console.log(e.target);
//     btn.remove()
//     i++;
//     btn.removeEventListener(); // remove the event listener after the first click
    
// }
// btn.addEventListener('click', deleteElement);

// btns.forEach(item => {
//     item.addEventListener('click', deleteElement);
// });

// btns.forEach(item => {
//     item.addEventListener('click', deleteElement, {once: true}); //work only once
// });

// btn.addEventListener('click', (e) => {
//     e.preventDefault();
//      console.log('hi');
//  });

// Navigation on DOM elements

// console.log(document.documentElement); // we get all the elements of DOM
// console.log(document.body); // we get all the elements of body etc.
// console.log(document.body.childNodes); // we get all the nodes of body
// console.log(document.body.firstChild);
// console.log(document.body.lastChild);
// console.log(document.body.firstElementChild); // getting the firs element of the child

// now we can work with all elements of the page
// console.log(document.querySelector('.add').parentNode.parentNode);
// console.log(document.querySelector('[data-current = "3"]').previousSibling); // getting the previous node
// console.log(document.querySelector('[data-current = "3"]').nextElementSibling); // getting the next element

for(let node of document.body.childNodes) {
    if(node.nodeName == '#text') {
        continue;
    }
    console.log(node);
}