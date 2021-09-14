'use strict';

document.addEventListener('DOMContentLoaded', () => {
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
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let newMovie = addInput.value;
        const favorite = checkbox.checked;
        if(newMovie) {
            if(newMovie.length > 21) {
                newMovie = `${newMovie.slice(0, 21)}...`;
            }
            if(favorite) {
                console.log('we are adding your favorite movies')
            }
            movieDB.movies.push(newMovie);
            sortArr(movieDB.movies);
            createMoviesList(movieDB.movies, list);
            console.log(movieDB.movies);
        }
        e.target.reset();
    });
    
    function sortArr(arr) {
        arr.sort();
    }

    function createMoviesList(movie, parent) {
        parent.innerHTML = '';

        movie.forEach((item, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1}. ${item}
                    <div class="delete"></div>
                </li>
                `
        });
        
        document.querySelectorAll('.delete').forEach((btn,i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMoviesList(movie, parent);
            });
        });
    }

    function deleteElem(arr) {
        arr.forEach(item => {
            item.remove();
        });
    };
   
    function makeChanges() {
        genre[0].textContent = 'Драма';
    promoBg[0].style.backgroundImage = 'url("img/bg.jpg")';
    }

    deleteElem(adv);
    makeChanges();
    createMoviesList(movieDB.movies,list);
});

// Events on mobile gadgets
        // touchstart
        // touchmove
        // touchend
        // touchenter
        // touchleave
        // touchcancel

// Async, defer dynemic scripts
const script = document.createElement('script');
script.src = 'js/test.js';
script.async = false; //тоді він буде звичайним скриптом
document.body.append(script);