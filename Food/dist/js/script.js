"use strict";
document.addEventListener('DOMContentLoaded', () => {

        //Tabs

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
    
    //Timer

    const deadLine = '2021-09-30';

    function getTimeRemaining(endTime) {
        let t =  Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(t/(1000 * 60 * 60 * 24)),
            hours = Math.floor((t/(1000 * 60 * 60)) % 24),
            minutes = Math.floor((t/1000 / 60) % 60),
            seconds = Math.floor((t/1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZero(num) {
        if(num >= 0 && num < 10) {
            num = `0${num}`;
            return num;
        } else if(num < 0) {
            return num = '00';
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
              
        updateClock(); // so as not to wait 1000 milliseconds

        function updateClock() {
            let t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            
            if(t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadLine);

    //Modal window

    const btnOpen = document.querySelectorAll('[data-modal]'),
          btnClose = document.querySelector('[data-close]'),
          modalWindow = document.querySelector('.modal');

    function openModal() {
        btnOpen.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                modalWindow.style.display = 'block';
            });
        });
    }
    openModal();

    function closeModal() {
        modalWindow.addEventListener('click', (e) => {
            e.preventDefault();
            let target = e.target;
            if(target == modalWindow || target == btnClose) {
                modalWindow.style.display = 'none';
            }
        });
    }
    closeModal();
});