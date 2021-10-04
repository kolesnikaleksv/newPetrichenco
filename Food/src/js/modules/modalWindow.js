function openModal(modalSelector, timerModal) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.add('show');// use the classes
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';// remove scrolling

    console.log(timerModal);
    if(timerModal) {
        clearInterval(timerModal);
    }
}

function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');
    document.body.style.overflow = '';// return scrolling

    
}

function modalWindow(triggerSelector, modalSelector, timerModal) {
    //Modal window

    const btnOpen = document.querySelectorAll(triggerSelector),
          modalWindow = document.querySelector(modalSelector);

    
    btnOpen.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, timerModal));
    });

    modalWindow.addEventListener('click', (e) => {
        let target = e.target;
        if(target == modalWindow || target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code == 'Escape' && modalWindow.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function openModalOffset() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, timerModal);
            window.removeEventListener('scroll', openModalOffset);
        }
    }
    window.addEventListener('scroll', openModalOffset);
}

export default modalWindow;
export {openModal};
export {closeModal};