/*
 * File    : main.js
 *
 * SUMMARY :
 * GLOBAL VARIABLE
 * INIT
 * FUNCTIONS
 */



(function(win){



/* **************************************** *
* GLOBAL VARIABLE
* **************************************** */



/* **************************************** *
* INIT
* **************************************** */
spline_load();
menu_tab();
page_motion();
page_marquee();
text_motion();
scroll_change();




/* **************************************** *
* FUNCTIONS
* **************************************** */
function spline_load(){

    if( !document.getElementById('spline-visual') ){ return }

    const canvas = document.getElementById('spline-visual');
    const url = canvas.getAttribute('data-url');

    window.addEventListener('load', async () => {
        try {
            const module = await import('./vendors/@splinetool/runtime/build/runtime.js');
            const Application = module.Application;
            const app = new Application(canvas);
            await app.load(url);
        } catch (error) {
            
        }
    });

}



function menu_tab(){

    const menu = document.querySelectorAll('.main-menu li');
    const page = document.querySelectorAll('.main-work__contents');

    if( !menu ) return;

    menu.forEach((item, idx) => {
        item.addEventListener('mouseover', () => {
            item.classList.add('hover');
            page[idx].classList.add('hover');
            gsap.fromTo(page[idx].querySelector('.main-work__contents-title'), {x: 20, autoAlpha: 0}, {x: 0, autoAlpha: 1, duration: 1, ease: 'power3.out'})
            gsap.fromTo(page[idx].querySelector('.main-work__contents-desc'), {x: -20, autoAlpha: 0}, {x: 0, autoAlpha: 1, duration: 1, ease: 'power3.out'})
            gsap.fromTo(page[idx].querySelector('.main-work__contents-skill'), {x: -20, autoAlpha: 0}, {x: 0, autoAlpha: 1, duration: 1, ease: 'power3.out'})
        });

        item.addEventListener('mouseout', () => {
            item.classList.remove('hover');
            page[idx].classList.remove('hover');
        });
    });

}



function page_motion(){

    const visual = document.querySelector('.work-visual__img');
    if( !visual ) return;

    gsap.fromTo(visual, {y: -450}, {y: 0, delay: .6, duration: 1, ease: 'power3.out'})

    const nextItem = document.querySelector('.work-next__item')
    nextItem.addEventListener('mouseover', () => {
        document.querySelector('.work-next').classList.add('hover');
    });

    nextItem.addEventListener('mouseout', () => {
        document.querySelector('.work-next').classList.remove('hover');
    });

}



function page_marquee(){

    const marquee = document.querySelectorAll('.work-next__marquee');

	if( !marquee ) return;

    // resize
	function marquee_resize(){

		marquee.forEach((item, index) => {

			const thisId = 'st-marquee-' + index;

			if ( item.style.display === 'none' ) { return true; }

			let wrap = item.querySelector('.work-next__marquee__inner');
			//let divNum = isScreen('768') ? 45 : 120;
			let divNum = 120;

            const spans = wrap.querySelectorAll('span');
			const speed = spans[0].getBoundingClientRect().width / divNum;

            spans.forEach((spanItem) => {

                spanItem.style.animationDuration = speed + 's';
                spanItem.style.animationPlayState = 'running';

                if( ScrollTrigger.getById( thisId ) == undefined ) {
                    ScrollTrigger.create({
                        trigger: item,
                        id: thisId,
                        once: false,
                        onEnter: () => {
                            spanItem.style.animationPlayState = 'running';
                        },
                        onEnterBack: () => {
                            spanItem.style.animationPlayState = 'running';
                        },
                        onLeave: () => {
                            item.style.animationPlayState = 'paused';
                        },
                        onLeaveBack: () => {
                            item.style.animationPlayState = 'paused';
                        }
                    });
                };

            });

		});
	};

	// init
	marquee.forEach((item, index) => {

		if ( item.style.display === 'none' ) { return true; }

		const conWidth = item.getBoundingClientRect().width;
		let wrap = null;

		item.innerHTML = '';

		item.insertAdjacentHTML('beforeend', '<div class="work-next__marquee__inner"><span class="sample">' + item.getAttribute('data-label') + '</span></div>');
		wrap = item.querySelector('.work-next__marquee__inner');

		const charWidth = wrap.querySelector('.sample').getBoundingClientRect().width;
		const count = Math.ceil(conWidth / charWidth) + 1;

		wrap.innerHTML = ''; // delete sample

		let html = '';

		for( i = 0; i < 2; i++ ) {

			html += '<span>';

			for(j = 0; j < count; j++) {
				html += '<i>' + item.getAttribute('data-label') + '</i>';
			}

			html += '</span>'

		};

		wrap.insertAdjacentHTML('beforeend', html);

		if( index + 1 == marquee.length ){
			marquee_resize();
			window.addEventListener('resize', marquee_resize());
		};

	});
}
  


function text_motion(){

    if (!!document.querySelector('.motion-up')){

        const motionUp = document.querySelectorAll('.motion-up');
    
        motionUp.forEach((item)=>{
            gsap.set(item, {y: 20, autoAlpha: 0});
            ScrollTrigger.create({
                trigger: item,
                start: 'top 80%',
                once: true,
                onEnter: function(){
                    gsap.to(item, {
                        y: 0, 
                        autoAlpha: 1, 
                        duration: 1,
                        rotation: 0,
                        ease: 'power3.out',
                        delay: 0
                    });
                }
            });
        });
        
    };

    if (!!document.querySelector('.motion-open')){

        const motionOpen = document.querySelectorAll('.motion-open');

        motionOpen.forEach((item)=>{
            gsap.set(item, {width: '0%',});
            ScrollTrigger.create({
                trigger: item,
                start: 'top 80%',
                once: true,
                onEnter: function(){
                    gsap.to(item, {
                        width: '100%', 
                        duration: 1,
                        rotation: 0,
                        ease: 'power3.out',
                        delay: 0
                    });
                }
            });
        });
    };

    if (!!document.querySelector('.motion-down')){

        const motionDown = document.querySelectorAll('.motion-down');

        motionDown.forEach((item)=>{
            gsap.set(item, {height: '0%'});
            ScrollTrigger.create({
                trigger: item,
                start: 'top 80%',
                once: true,
                onEnter: function(){
                    gsap.to(item, {
                        height: '100vh', 
                        duration: 1,
                        rotation: 0,
                        ease: 'power3.out',
                        delay: 0
                    });
                }
            });
        });
    };
}



function scroll_change(){

    const blogList = document.querySelector(".about-blog__list");

    if( !blogList ) return;

    const totalWidth = blogList.scrollWidth - blogList.clientWidth;

    gsap.to(blogList, {
        x: () => -totalWidth,
        ease: "none",
        scrollTrigger: {
            trigger: ".about-blog",
            start: "top top",
            end: () => "+=" + totalWidth,
            scrub: true,
            pin: true,
            anticipatePin: 1,
        }
    });

}
    
    
})();