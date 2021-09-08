"use strict";

let numberOfFilms;

// function start() {
//     while(numberOfFilms == null || numberOfFilms == '' || isNaN(numberOfFilms)) {
//         numberOfFilms = +prompt('How many movies have you already watched?', '');
//     }
// }

//start();

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: function() {
        while(numberOfFilms == null || numberOfFilms == '' || isNaN(numberOfFilms)) {
            numberOfFilms = +prompt('How many movies have you already watched?', '');
        }
    },
    showMyDB: function() {
        if(personalMovieDB.privat == false) {
            console.log(personalMovieDB);
        }
    },
    writeYourGenres: function() {
        for(let i = 0; i < 3; i++) {
            let a = prompt(`What is your favorite genre under number?${i + 1}`, '');
            if(a == null || a == '') {
                i--;
            } else {
                personalMovieDB.genres[i] = a;
            }
        }
        personalMovieDB.genres.forEach((element, index) => {
            console.log(`Favorite genre # ${index + 1} - is ${element}`);
        })
    },
    rememberMyFilms: function() {
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
    },
    personalLevelDetected: function() {
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
};
console.log(personalMovieDB.privat);
function toggleVisibleMyDB() {
    if(!personalMovieDB.privat) {
        personalMovieDB.privat = true;
    } else {
        personalMovieDB.privat = false;
    }
}
toggleVisibleMyDB();
console.log(personalMovieDB.privat);
personalMovieDB.showMyDB();
personalMovieDB.writeYourGenres();

// function showMyDB() {
//     if(personalMovieDB.privat == false) {
//         console.log(personalMovieDB);
//     }
// }

// showMyDB();

// function writeYourGenres() {
//     for(let i = 0; i < 3; i++) {
//         personalMovieDB.genres[i] = prompt(`What is your favorite genre under number?${i + 1}`, '');
//     }
// }

//writeYourGenres();

// function rememberMyFilms() {
//     for(let i = 0; i < 2; i++) {
//         let a = prompt('One of the last movies you watched?', ''),
//             b = prompt('How mach do you appreciate it?', '');
            
//             if(a == "" || b == '' || a == null || b == null ||  a.length > 50 || b.length > 50){
//                 i--;
//                 console.log('fail');
//             } else {
//                 personalMovieDB.movies[a] = b;
//             }
//     }
// }

//rememberMyFilms();

// function personalLevelDetected() {
//     if(personalMovieDB.count <= 10 && personalMovieDB.count > 0) {
//         alert('You have watched too few movies.');
//     } else if(personalMovieDB.count > 10 && personalMovieDB.count < 30) {
//         alert("You are a classic spectator.");
//     } else if(personalMovieDB.count >= 30) {
//         alert("You are a big fan of movies.")
//     } else {
//         alert("An error occurred!");
//     }
// }

//personalLevelDetected();

console.log(personalMovieDB);

