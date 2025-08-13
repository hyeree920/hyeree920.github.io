/*
 * File    : main.js
 *
 * SUMMARY :
 * GLOBAL VARIABLE
 * INIT
 * FUNCTIONS
 */



(function(){



/* **************************************** *
* GLOBAL VARIABLE
* **************************************** */



/* **************************************** *
* INIT
* **************************************** */
menu_tab();



/* **************************************** *
* FUNCTIONS
* **************************************** */
function menu_tab(){

    const menu = document.querySelectorAll('.main-menu li');
    const page = document.querySelectorAll('.main-work__contents');

    menu.forEach((item, idx) => {
        item.addEventListener('mouseover', () => {
            item.classList.add('hover');
            page[idx].classList.add('hover');
            console.log(page[idx].querySelector('.main-work__contents-img'))
            //gsap.to(page[idx].querySelector('.main-work__contents-img-inner'), {'width': '100%', duration: 1, ease: 'power3.out'})
            gsap.fromTo(page[idx].querySelector('.main-work__contents-title'), {x: 20, autoAlpha: 0}, {x: 0, autoAlpha: 1, duration: 1, ease: 'power3.out'})
            gsap.fromTo(page[idx].querySelector('.main-work__contents-desc'), {x: -20, autoAlpha: 0}, {x: 0, autoAlpha: 1, duration: 1, ease: 'power3.out'})
            gsap.fromTo(page[idx].querySelector('.main-work__contents-skill'), {x: -20, autoAlpha: 0}, {x: 0, autoAlpha: 1, duration: 1, ease: 'power3.out'})
        });

        item.addEventListener('mouseout', () => {
            item.classList.remove('hover');
            page[idx].classList.remove('hover');
            //gsap.to(page[idx].querySelector('.main-work__contents-img-inner'), {'width': '0%', duration: 0, ease: 'power3.out'})

        });
    });

}



// function app_motion(){


//     img.forEach((item) => {

//     });

// }
    
    
    
})();