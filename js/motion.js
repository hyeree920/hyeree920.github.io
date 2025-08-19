/*
 * File    : motion.js
 *
 * SUMMARY :
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
spline_load();
//intro_loading_init();

    
    
/* **************************************** *
* FUNCTIONS
* **************************************** */
function spline_load(){

    if( !document.querySelector('.jt-spline') ){ return }

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

    
// intro, loading
function intro_loading_init(){

    const intro = document.querySelector('.intro-container');
    const loading = document.querySelector('.loading-container');
    const text = intro.querySelector('.intro-text');
    const percent = intro.querySelector('.intro-percent');
    const percentValue = intro.querySelector('.intro-percent-value');
    const isInit = { percentInit: false, textInit: false };

    if( sessionStorage.getItem('jt-intro-session') && sessionStorage.getItem('jt-intro-session') == '1' ) {

        // loading
        document.querySelector('.loading-container__logo svg').style.display = 'block';

        if( document.querySelector('.jt-spline') ){ // spline 사용

            let duration = document.body.classList.contains('home') ? 1.4 : 1;

            gsap.to('.loading-container__overlay', { 
                x: '100%', 
                ease: 'power2.inOut', 
                duration: duration,
            });

            // load 완료
            const onLoadCheck = setInterval(() => {
                if(onLoad){
                    gsap.to('.loading-container', {y: '100%', duration: 1, ease: 'power2.inOut', onComplete: () => {
                        loading.remove();
                        intro_close_after();
                    }});
                    clearInterval(onLoadCheck);
                }
            }, 50);

        } else { // spline 미사용

            gsap.to('.loading-container__overlay', { 
                x: '100%', 
                ease: 'power2.inOut', 
                duration: 0.4,
                onComplete: ()=>{
                    gsap.to('.loading-container', {y: '100%', duration: 1, delay: 0.3, ease: 'power2.inOut', onComplete: () => {
                        loading.remove();
                        intro_close_after();
                    }});
                }
            });

        }

    } else {

        // intro
        intro.style.display = 'block';
        loading.style.display = 'none';
        
        gsap.to(text, { 
            opacity: 1, 
            duration: 1,
            onComplete: function() {
                isInit.textInit = true;
                intro_close();
            }
        });

        // progress motion
        let maxPercent = 100;
        let currPercent = 0;
        let progressTimer = null;

        function increaseProgress(currPercent){
            percent.style.setProperty('--value', currPercent);
            percentValue.textContent = `${currPercent}%`;

            if (currPercent === maxPercent) {
                isInit.percentInit = true;
                progressTimer = null;
                intro_close();
                return;
            }

            const delay = 50 * (1 - (maxPercent - currPercent) / maxPercent);
            clearTimeout(progressTimer);

            progressTimer = setTimeout(() => increaseProgress(currPercent + 1), delay);
        };

        progressTimer = setTimeout(() => increaseProgress(currPercent + 1), 50);

        // close
        function intro_close() {

            if (!(isInit.percentInit && isInit.textInit)) return ;
            
            const onIntroCheck = setInterval(() => {
                if(onLoad){
                    gsap.to(text, {y: '-110%', duration: 0.4, ease: 'power2.inOut'});
                    gsap.to(percent, {y: '-110%', duration: 0.4, ease: 'power2.inOut', delay: .2});
                    gsap.to(intro, {
                        y: '-100%', 
                        ease: 'power2.inOut',
                        delay: .8, 
                        onComplete: function() {
                            intro_close_after();
                            sessionStorage.setItem('jt-intro-session', '1');
                        }
                    });
    
                    clearInterval(onIntroCheck);
                }
            }, 50);
        };

    }

    function intro_close_after(){

        loading.remove();
        intro.remove();

    }
}
    
    
    
})();