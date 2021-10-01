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
        modalWindow.classList.add('show');// use the classes
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';// remove scrolling
    }
    
    function closeModal() {
        modalWindow.classList.remove('show');
        modalWindow.classList.add('hide');
        document.body.style.overflow = '';// return scrolling
        clearInterval(timerModal);
    }
    
    btnOpen.forEach(item => {
        item.addEventListener('click', openModal);
    });

    modalWindow.addEventListener('click', (e) => {
        let target = e.target;
        if(target == modalWindow || target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code == 'Escape' && modalWindow.classList.contains('show')) {
            closeModal();
        }
    });
   
    const timerModal = setTimeout(openModal, 50000);

    function openModalOffset() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', openModalOffset);
        }
    }
    window.addEventListener('scroll', openModalOffset);

    // A Menu

    const menu = document.querySelector('.menu');
          

    class CreateMenu {
        constructor(img,altimg, subtitle, descr,price, parentSelector, ...classes) {
            this.img = img;
            this.subtitle = subtitle;
            this.altimg = altimg;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUah();
        }

        changeToUah() {
            return this.price = Math.floor(this.price / this.transfer);
        }
        
        render() {
            let element = document.createElement('div');
            if(this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(newClass => element.classList.add(newClass));
            }
            
            element.innerHTML = `
                <img src=${this.img} alt=${this.altimg}>
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getData = async (url) => { 
        const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`Could not fetch ${url} status: ${res.status}`);
        }
        return await res.json();
    }

//    getData('http://localhost:3000/menu')
//    .then(data => {
//        data.forEach(({img, altimg, title, descr, price})=> {
//             new CreateMenu(img, altimg, title, descr, price, '.menu .container').render();
//        });
//    });


        // form

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    
    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: data
        })
        return await res.json();
    }
    
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
        
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            postData('http://localhost:3000/requests', json)
            .then(date => {
                console.log(date);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    // nice user notification

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times; </div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    //slider

    // const prevSlide = document.querySelector('.offer__slider-prev'),
    //       nextSlide = document.querySelector('.offer__slider-next'),
    //       current = document.querySelector('#current'),
    //       total = document.querySelector('#total'),
    //       slides = document.querySelectorAll('.offer__slide');

    // let slideIndex = 1;
    // showSlide(slideIndex);

    // total.innerHTML = `${getZero(slides.length)}`;

    // prevSlide.addEventListener('click', () => {
    //     if(slideIndex <= 1) {
    //         slideIndex = slides.length;
    //         showSlide(slideIndex);
    //     } else {
    //         slideIndex = slideIndex - 1;
    //         showSlide(slideIndex);
    //     }
        
    // });

    // nextSlide.addEventListener('click', () => {
    //     if(slideIndex >= 4) {
    //         slideIndex = 1;
    //         showSlide(slideIndex);
    //     } else {
    //         slideIndex = slideIndex + 1;
    //     showSlide(slideIndex);
    //     }
        
    // });

    // function showSlide() {
    //     slides.forEach(item => item.classList.add('hide'));
    //     slides[slideIndex - 1].classList.add('show');
    //     slides[slideIndex - 1].classList.remove('hide');
    //     current.innerHTML = `${getZero(slideIndex)}`;
    // }
    
// Second way to create the slider from teacher
    
    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slideWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slideWrapper).width; //the object is returned. we get only the width
        
        let slideIndex = 1;
        let offset = 0; // offset size
        let dots =[];
        

        if(slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        } else {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }

    slidesField.style.width = 100 * slides.length + '%'; // we line up all the slides in one row
    slidesField.style.display = 'flex'; // in a row
    slidesField.style.transition = '0.5s all'; 
    slideWrapper.style.overflow = 'hidden';
    
    slides.forEach(item => {
        item.style.width = width;//give all slides the width of the window
    });
    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }
    next.addEventListener('click', () => {
        if(offset == deleteNotDigits(width) * (slides.length - 1)) {// 500px
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        checkDots();
    });

    prev.addEventListener('click', () => {
        if(offset == 0) {// 500px
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        checkDots();
    });
    
    let slider = document.querySelector('.offer__slider');
        slider.style.position = 'relative';

    let dotWrapper = document.createElement('div');
        dotWrapper.classList.add('carousel-indicators');
        slider.append(dotWrapper);
        
    
    for(let i = 0; i < slides.length; i++) {
        let dot = document.createElement('div');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        
        if(i == 0) {
            dot.style.opacity = 1;
        }
        dotWrapper.append(dot);
        dots.push(dot);
    }
    
    function checkDots() {
        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }
    
    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;
           
            checkDots();
        });
    });
   
    // Calc

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
       let elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if(elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }

            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {

        if(!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if(sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');


});
//Encapsulation
//create a function constructor

    // function User(name, age) {
    //     this.name = name;
    //     this.age = age;

    //     this.say = () => {
    //         console.log(`my name is ${this.name} I am a ${this.age} years old`);
    //     };
    // }

    // const alex = new User('alex', 25);

    // console.log(alex.name);
    // alex.name = 'boris';
    // console.log(alex.name);
//answer is:
//alex
// boris
// so anyone could change the value of the properties

    // function User(name, age) {
    //     this.name = name;
    //     let userAge = age;

    //     this.say = () => {
    //         console.log(`my name is ${this.name} I am a ${userAge} years old`);
    //     };
    // }

    // const alex = new User('alex', 25);

    // alex.name = 'boris';
    // alex.userAge = 34;
    // console.log(alex.userAge);

    // alex.say();
// now userAge couldn't be changed

//try to create functions of getters and setters

    // function User(name, age) {
    //     this.name = name;
    //     let userAge = age;

    //     this.say = () => {
    //         console.log(`my name is ${this.name} I am a ${userAge} years old`);
    //     };

    //     this.getAge = () => {
    //         return userAge;
    //     };
    //     this.setAge = age => {
    //         if(typeof age === 'number' && age > 0 && age < 110) {
    //             userAge = age;
    //         } else {
    //             console.log('Invalid value!');
    //         }
    //     };

    // }

    // const alex = new User('alex', 25);

    // console.log(alex.name);
    // console.log(alex.getAge());

    // alex.setAge(30);
    // alex.setAge(300);
    // alex.name = 'boris';
    // console.log(alex.getAge());

    // alex.say();
//Answer
// alex
// 25
// Invalid value!
// 30
// my name is boris I am a 30 years old

//let's try to see what it looks like on the class
    // class User {
    //     constructor(name, age) {
    //         this.name = name;
    //         let userAge = age;
    //     }
        
    //     say(){
    //         console.log(`my name is ${this.name} I am a ${userAge} years old`);
    //     }
    //     getAge (){
    //         return userAge;
    //     }
    //     setAge(age){
    //         if(typeof age === 'number' && age > 0 && age < 110) {
    //             userAge = age;
    //         } else {
    //             console.log('Invalid value!');
    //         }
    //     }

    // }

    // const alex = new User('alex', 25);

    // console.log(alex.name);
    // console.log(alex.getAge());

    // alex.setAge(30);
    // alex.setAge(300);
    // alex.name = 'boris';
    // console.log(alex.getAge());

    // alex.say();

// try to call userAge
    // class User {
    //     constructor(name, age) {
    //         this.name = name;
    //         let userAge = age;
    //     }
        
    //     say(){
    //         console.log(`my name is ${this.name} I am a ${this.userAge} years old`);
    //     }
    //     getAge (){
    //         return userAge;
    //     }
    //     setAge(age){
    //         if(typeof age === 'number' && age > 0 && age < 110) {
    //             userAge = age;
    //         } else {
    //             console.log('Invalid value!');
    //         }
    //     }

    // }

    // const alex = new User('alex', 25);

    // alex.say();
// answer is:
//my name is alex I am a undefined years old

//try to create with - this
    // class User {
    //     constructor(name, age) {
    //         this.name = name;
    //         this.userAge = age;
    //     }
        
    //     say(){
    //         console.log(`my name is ${this.name} I am a ${this.userAge} years old`);
    //     }
    //     getAge (){
    //         return this.userAge;
    //     }
    //     setAge(age){
    //         if(typeof age === 'number' && age > 0 && age < 110) {
    //             this.userAge = age;
    //         } else {
    //             console.log('Invalid value!');
    //         }
    //     }

    // }

    // const alex = new User('alex', 25);

    // console.log(alex.name);
    // alex.userAge = 99;
    // console.log(alex.getAge());

    // alex.setAge(30);
    // alex.setAge(300);
    // alex.name = 'boris';
    // console.log(alex.getAge());

    // alex.say();
//answer is:
// alex
// 99               we lose encopsulation !!!
// Invalid value!
// 30
// my name is boris I am a 30 years old

//Therefore classes are not used for encapsulation

//Programmers use loadash to show which features should to hide
    // class User {
    //     constructor(name, age) {
    //         this.name = name;
    //         this._age = age;
    //     }
        
    //     say(){
    //         console.log(`my name is ${this.name} I am a ${this._age} years old`);
    //     }
    //     get age(){
    //         return this._age;
    //     }
    //     set age(age){
    //         if(typeof age === 'number' && age > 0 && age < 110) {
    //             this._age = age;
    //         } else {
    //             console.log('Invalid value!');
    //         }
    //     }

    // }

    // const alex = new User('alex', 25);

    // console.log(alex.age); //Here we contact to getter
    // alex.age = 99;         //Here wee contact to setter
    // console.log(alex.age);

    // alex.say();

// //This is a good approach but can be circumvented and this wrong way (under:)
//     class User {
//         constructor(name, age) {
//             this.name = name;
//             this._age = age;
//         }
        
//         say(){
//             console.log(`my name is ${this.name} I am a ${this._age} years old`);
//         }
//         get age(){
//             return this._age;
//         }
//         set age(age){
//             if(typeof age === 'number' && age > 0 && age < 110) {
//                 this._age = age;
//             } else {
//                 console.log('Invalid value!');
//             }
//         }

//     }

//     const alex = new User('alex', 25);

//     console.log(alex._age); //we circumvented encapsulation
//     alex._age = 99;         //and directly changed the entities
//     console.log(alex._age);

//     alex.say();


// Experimental sintaksys in JS

    // class User {
    //     constructor(name, age) {
    //         this.name = name;
    //         this._age = age;
    //     }
    //     surname = 'Petrich';
    //     say(){
    //         console.log(`my name is ${this.name} ${this.surname}I am a ${this._age} years old`);
    //     }
    //     get age(){
    //         return this._age;
    //     }
    //     set age(age){
    //         if(typeof age === 'number' && age > 0 && age < 110) {
    //             this._age = age;
    //         } else {
    //             console.log('Invalid value!');
    //         }
    //     }

    // }

    // const alex = new User('alex', 25);


    // alex.say();
//response in google chrom browser is:
//my name is alex PetrichI am a 25 years old

// but it only work with googleChrom browser

// and now we can create an arrow function so as not to lose context
// class User {
//     constructor(name, age) {
//         this.name = name;
//         this._age = age;
//     }
//     surname = 'Petrich';
//     say = () => {
//         console.log(`my name is ${this.name} ${this.surname}I am a ${this._age} years old`);
//     }
//     get age(){
//         return this._age;
//     }
//     set age(age){
//         if(typeof age === 'number' && age > 0 && age < 110) {
//             this._age = age;
//         } else {
//             console.log('Invalid value!');
//         }
//     }
// }

// const alex = new User('alex', 25);


// alex.say();

// Что бы сделать такое свойство приватным, необходимо перед ним поставить решетку #
    // class User {
    //     constructor(name, age) {
    //         this.name = name;
    //         this._age = age;
    //     }
    //     #surname = 'Petrich';
    //     say = () => {
    //         console.log(`my name is ${this.name} ${this.#surname}I am a ${this._age} years old`);
    //     }
    //     get age(){
    //         return this._age;
    //     }
    //     set age(age){
    //         if(typeof age === 'number' && age > 0 && age < 110) {
    //             this._age = age;
    //         } else {
    //             console.log('Invalid value!');
    //         }
    //     }
    // }

    // const alex = new User('alex', 25);
    // console.log(alex.surname); // receive undefined

    // alex.say();
// Снаружи мы теперь не можем получить это свойство, но внутри оно выводит
// какое то значение
// и даже если мы попытаемся обратится как в примере с лодашами, то у нас ничего не
// получится так как это свойство является приватным
    // console.log(alex.#surname); // receive error
//receive in browser console is:
//Uncaught SyntaxError: Private field '#surname' must be declared in an enclosing class
