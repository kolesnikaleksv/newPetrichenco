function tabs(tabsSelector, tabsParentSelector, tabsContentSelector, classActive) {
    //Tabs

    let tabsParent = document.querySelector(tabsParentSelector),
    tabs = document.querySelectorAll(tabsSelector),
    tabContent = document.querySelectorAll(tabsContentSelector);


    function hideTabsContent() {
        tabs.forEach(item => {
            item.classList.remove(classActive);
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

        if(e.target && e.target.classList.contains(tabsSelector.slice(1))) {
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

export default tabs;