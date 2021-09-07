// let number = 1;
// const NUmber = 5;

// number = 8;
// console.log(number);
// const obj = {
//     a: 10
// };
// obj.a = 11
// console.log(obj.a);
// alert('hello world');
// const answer = confirm('are you  eighteen years');
// console.log(answer);

// const quize = +prompt('are you here?', 'No');
// console.log(typeof(quize));

// const answers = [];
// answers[0] = " hi";
// answers[1] = prompt('how old are you?', '');
// answers[2] = prompt('What is your name?', '');
// answers[3] = prompt('do you have sex?', '');

// console.log(typeof(answers));Hello ${answers[2]} you are too small for this site. you are ${answers[1]} years old
// alert(``);

// let incr = 10,
//     decr = 10;

//     incr++;
//     ++decr;
//     console.log(incr,decr);
//     console.log(3*5 === 15);
//     let arg = 5;
//     console.log(`5 + ${arg}`);
//     console.log(`6 - ${3}`);

// (7 == 7) ? console.log('da') : console.log('net');

// if (2 == 8) {
//     console.log('yes');
// } else {
//     console.log('no');
// };
// let num = 50;
// switch(num) {
//     case 49:
//         console.log('a');
//         break;
//     case 51:
//         console.log('b');
//         break;
//     case 100:
//         console.log('c');
//         break;
//     default:
//         console.log('d')
//         break;
// }

// // loope
// let sum = 20;
// while(sum <= 25) {
//     console.log(sum);
//     sum++;
// }

// do {
//     console.log(sum);
//     sum++;
// }while(sum <= 26);

// for(let i = 0; i < 10; i++) {
    
//     if (i === 4) {
//         continue;
//     } else if(i ==8) {
//         break;
//     }
//      console.log(i);
// }

let numberOfFilms = +prompt('How many movies have you already watched?', '');

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

// let a = prompt('One of the last movies you watched?', ''),
//     b = prompt('How mach do you appreciate it?', ''),
//     c = prompt('One of the last movies you watched?', ''),
//     d = prompt('How mach do you appreciate it?', '');

for(let i = 0; i < 2; i++) {
    let a = prompt('One of the last movies you watched?', ''),
        b = prompt('How mach do you appreciate it?', '');
        personalMovieDB.movies[a] = b;
        if(a == ""){
            a = prompt('One of the last movies you watched?', '');
            b = prompt('How mach do you appreciate it?', '');
            personalMovieDB.movies[a] = b;
        }
}


// personalMovieDB.movies[a] = b;
// personalMovieDB.movies[c] = d;

console.log(personalMovieDB);

