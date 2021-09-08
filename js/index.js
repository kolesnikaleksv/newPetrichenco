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

//writeYourGenres();

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

// OOP
let john = {
    health: 200,
    armor: 400,
    sayHello: function() {
        console.log('Hello');
    }
}
let soldier = {
    health: 100
}
//soldier.__proto__ = john; // Outdated method
Object.setPrototypeOf(soldier, john);

console.log(soldier.armor);
soldier.sayHello();
// instead we have to use new mehtods
//Object.create()        - create a prototype with a specific prototype
//Object.getProrotypeOf()  - receives prototypes
//Object.setPrototypeOf()  - obtaining prototypes
//soldier.__proto__ = john; == Object.setPrototypeOf(soldier, john);
// we create a new object joy that will be inherited from the object soldier
const joy = Object.create(john);
console.log(joy.health);
joy.sayHello();