function tabs() {
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
    });
}

module.exports = tabs;