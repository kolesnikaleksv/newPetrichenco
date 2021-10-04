function modalWindow() {
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
}

module.exports = modalWindow;