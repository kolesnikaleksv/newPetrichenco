"use strict";

let numberOfFilms;

function start() {
    while(numberOfFilms == null || numberOfFilms == '' || isNaN(numberOfFilms)) {
        numberOfFilms = +prompt('How many movies have you already watched?', '');
    }
}

//start();

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

function showMyDB() {
    if(personalMovieDB.privat == false) {
        console.log(personalMovieDB);
    }
}

showMyDB();

function writeYourGenres() {
    for(let i = 0; i < 3; i++) {
        personalMovieDB.genres[i] = prompt(`What is your favorite genre under number?${i + 1}`, '');
    }
}

writeYourGenres();

function rememberMyFilms() {
    for(let i = 0; i < 2; i++) {
        let a = prompt('One of the last movies you watched?', ''),
            b = prompt('How mach do you appreciate it?', '');
            
            if(a == "" || b == '' || a == null || b == null ||  a.length > 50 || b.length > 50){
                i--;
                console.log('fail');
            } else {
                personalMovieDB.movies[a] = b;
            }
    }
}

//rememberMyFilms();

function personalLevelDetected() {
    if(personalMovieDB.count <= 10 && personalMovieDB.count > 0) {
        alert('You have watched too few movies.');
    } else if(personalMovieDB.count > 10 && personalMovieDB.count < 30) {
        alert("You are a classic spectator.");
    } else if(personalMovieDB.count >= 30) {
        alert("You are a big fan of movies.")
    } else {
        alert("An error occurred!");
    }
}

//personalLevelDetected();

console.log(personalMovieDB);

//lesson

const obj = {
    name: 'carlos',
    high: 104,
    wedth: 205,
    colors: {
        border: 'black',
        color: 'red'
    },
    makeTest: function(u) {
        console.log(u);
    }
}

//obj.makeTest('test');
const {border, color} = obj.colors;
//console.log(obj);
// let i = 0;
// for(let key in obj) {
//     if(typeof(obj[key]) == 'object') {
//         for(let i in obj[key]) {
//             console.log(`key is ${i} ontions is ${obj[key][i]}`);
//         }
//     } else {
//         console.log(`key is ${key} options is ${obj[key]}`);
//     }
//     i++;
// }
console.log(Object.keys(obj).length);


