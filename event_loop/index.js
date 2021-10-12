    "use strict";

    // console.log(1);

    // setTimeout(() => {
    //     console.log('timeout_2000');
    // }, 2000);

    // setTimeout(() => {
    //     console.log('timeout_4000');
    // }, 4000);

    // console.log(2);
//we receive
// 1
// 2
// time_2000
// time_4000

    // console.log(1);

    // setTimeout(() => {
    //     console.log('timeout_2000');
    // }, 4000);

    // setTimeout(() => {
    //     console.log('timeout_4000');
    // }, 4000);

    // console.log(2);
// we receive
// 1
// 2
// timeout_2000
// timeout_4000

// go to http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D
// to view all events in js
// call stack - those operations that are being performed right now
// web Apis - special storage in the browser for storing pending operations
// callback queue - queue of operations

// code from resurse

    // $.on('button', 'click', function onClick() {
    //     setTimeout(function timer() {
    //         console.log('You clicked the button!');    
    //     }, 2000);
    // });

    // console.log("Hi!");

    // setTimeout(function timeout() {
    //     console.log("Click the button!");
    // }, 5000);

    // console.log("Welcome to loupe.");

// we added an array and the loop forEach()
    // $.on('button', 'click', function onClick() {
    //     setTimeout(function timer() {
    //         console.log('You clicked the button!');    
    //     }, 2000);
    // });
    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    // arr.forEach((item) => {
    //     console.log(item);
    // });

//if a loop or some sort of overbearing construction gets into
//the callstask, all other tasks will wait in the queue until 
//the search ends

//add load to our page and a complex loop
    let k = 0
    function count() {
        for(let i = 0; i < 1e9; i++) {
            k++;
        }
        alert('done');
    }
    count();
//Now our whole page hangs before this cycle is executed, since this 
//cycle has already got into call Stack

//therefore, large tasks must be broken down into smaller ones

// task from the interview

    setTimeout(() => {
        console.log(1);
    }, 0);

    console.log(2);
// we will receive
//2
//1

//because the setTimeout() still hits the Web Apis and then to the 
//callback Queue and only then to the call Stack
// and also
//because this function, by definition, has a delay of 4 ml sec