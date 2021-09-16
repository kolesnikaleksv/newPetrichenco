"use strict";
document.addEventListener('DOMContentLoaded', () => {

    let tabsParent = document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent');


    function hideTabsContent() {
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });

        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
    }
    hideTabsContent();

    function showTabsContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    showTabsContent();

    tabsParent.addEventListener('click', e => {
        e.preventDefault();

        if(e.target && e.target.classList.contains('tabheader__item')) {
            const target = e.target;

            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            })            
        }
    })
    
});
//Work with dates
//const now = new Date();//this object shows us thecurrent date
// We can transfer a lot of date to this object in different ways
//const now = new Date('2021-09-16');
// const now = new Date(2021, 9, 16, 20);
// The methods
const now = new Date();

// console.log(now.getFullYear());
// console.log(now.getMonth());
// console.log(now.getDate());
// console.log(now.getDay()); // starting on monday
// console.log(now.getUTCHours());//returns the Greenwich time

//and getHours getMinutes etc

// console.log(now.getTimezoneOffset());// returns the time difference in minutes
//console.log(now.getTime());// returns time since 1970 in milliseconds

// set
// console.log(now.setHours(10)); // returns in milliseconds
// console.log(now);// returns the normal date

let start = new Date();

for(let i = 0; i < 100000; i++) {
    let some = i ** 3;
}
let end = new Date();

alert(`время потраченное на вычисления ${end - start} миллисекунд`);