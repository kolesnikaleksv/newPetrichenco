function slider() {
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
}

module.exports = slider;