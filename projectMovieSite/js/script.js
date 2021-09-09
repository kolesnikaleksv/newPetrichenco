/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

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
    list = document.querySelectorAll('.promo__interactive-list'),
    movieName = list[0].querySelectorAll('.promo__interactive-item');


let arr = [];
for(let i = 0; i < movieDB.movies.length; i++) {
    arr[i] = movieDB.movies[i].toLowerCase();
    arr.sort();
}
arr.forEach((item, i) => {
    movieName[i].textContent = `${i + 1}. ${item}`;
});

adv.forEach(item => {
    item.remove();
});

genre[0].textContent = 'Драма';
promoBg[0].style.backgroundImage = 'url("img/bg.jpg")';

