'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

let adv = document.querySelectorAll('.promo__adv img'),
    genre = document.querySelectorAll('.promo__genre'),
    promoBg = document.querySelectorAll('.promo__bg'),
    list = document.querySelector('.promo__interactive-list'),
    input = document.querySelector('.adding__input'),
    trash = list.querySelectorAll('.delete'),
    checkbox = document.querySelectorAll('.add input')[1],
    btn = document.querySelector('.add button');

console.log(trash);
// function delTrash() {
//     console.log('hello');
// }
trash.forEach(item => {
    console.log(item);
    item.style.cssText = `hidden: true`;
    item.addEventListener('click', () => {
        console.log('trash');
    })
    
});


function addMovies(e) {
    e.preventDefault();
    if(input.value.length > 10) {
        let a = input.value.split('').slice(0, 10).join('') + '...';
        console.log(a);
        movieDB.movies.push(a);
        input.value = '';
        
    } else {
        movieDB.movies.push(input.value);
        input.value = '';
        
    }
    start();
}

btn.addEventListener('click', addMovies);
// checkbox.addEventListener('change', () => {
//     if(checkbox.value) {
//         console.log('hi');
//     } else {
//         console.log('by');
//     }
// });

// movieDB.movies.sort();

// list.innerHTML = '';

function start() {
    movieDB.movies.sort();

    list.innerHTML = '';
    movieDB.movies.forEach((item, i) => {
        list.innerHTML += `
            <li class="promo__interactive-item">${i + 1}. ${item}
                <div class="delete"></div>
            </li>
            `
    });
    if(!checkbox.checked) {
        console.log('not a favorite movie');
    } else {
        console.log('add your favorite movie');
    }
}
start();
// movieDB.movies.forEach((item, i) => {
//     list.innerHTML += `
//         <li class="promo__interactive-item">${i + 1}. ${item}
//             <div class="delete"></div>
//         </li>
//         `
// });

adv.forEach(item => {
    item.remove();
});

genre[0].textContent = 'Драма';
promoBg[0].style.backgroundImage = 'url("img/bg.jpg")';