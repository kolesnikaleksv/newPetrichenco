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
            item.style.display = 'none';
        });
    }
    hideTabsContent();

    function showTabsContent(i = 0) {
        tabs[i].classList.add('tabheader__item_active');
        tabContent[i].style.display = 'block';
    }
    showTabsContent();

    
    // tabItem.forEach((item, i) => {
    //     console.log(`${item} and ${i}`);
    //     if(item.classList.contains('tabheader__item_active') || i == 0) {
    //         item.classList.remove('tabheader__item_active');
    //         console.log('by');
    //     } else {

    //     }
    // });
    tabsParent.addEventListener('click', e => {
        e.preventDefault();
        console.log('hi');
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
    // tabs.forEach( (item, i) => {
    //     item.addEventListener('click', (e) => {
    //         e.preventDefault();
            
    //         if(e.target && e.target.classList.contains('tabheader__item')) {
    //             hideTabsContent();
    //             showTabsContent(i);
    //         } else {
    //             hideTabsContent(i);
    //         }
            
    //     })
    // })
});
