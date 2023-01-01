'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'img/spinner.gif',
        ok: 'img/ok.png',
        fail: 'img/fail.png'
    };

    const indexPage = 'index.html',
          productsPage = 'products.html',
          itemPage = 'item.html',
          commentsPage = 'comments.html',
          paymentPage = 'payment.html',
          aboutPage = 'about.html',
          footerLogo = document.querySelector('.footer__logo'),
          headerLogo = document.querySelector('.header__logo'),
          blockItem = document.querySelectorAll('.choice__block'),
          footerLink = document.querySelectorAll('.footer__link'),
          products = document.querySelectorAll('.choice__block');

    function sliderClass(sliderSelector, sliderWrapperSelector, nextSelector, prevSelector, width, slidesSelector) {
        let offset = 0;
        const slider = document.querySelector(sliderSelector),
              sliderWrapper = document.querySelector(sliderWrapperSelector),
              next = document.querySelector(nextSelector),
              prev = document.querySelector(prevSelector),
              slides = document.querySelectorAll(slidesSelector);
        
        slider.style.width = 100 * slides.length + '%';
        slider.style.display = 'flex';
        slider.style.transition = '0.65s all';
        sliderWrapper.style.overflow = 'hidden';

        slides.forEach(slides => {
            slides.style.width = width;
        });

        next.addEventListener('click', () => {
            if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
                offset = 0;
            } else {
                offset += +width.slice(0, width.length - 2);
            }

            slider.style.transform = `translateX(-${offset}px)`;
        });

        prev.addEventListener('click', () => {
            if (offset == 0) {
                offset = +width.slice(0, width.length - 2) * (slides.length - 1);
            } else {
                offset -= +width.slice(0, width.length - 2);
            }

            slider.style.transform = `translateX(-${offset}px)`;
        });
    };

    function openPage(btn, href) {
        btn.addEventListener('click', () => {
            window.location.href = href;
            scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        });
    };

    function openPageForEach(btn, href) {
        btn.forEach(btn => btn.addEventListener('click', () => {
            window.location.href = href;
            scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }));
    };

    function scrollTop(btn) {
        btn.addEventListener('click', () => {
            scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        });
    };

    function openThisItem(btns) {
        btns.forEach(btn => btn.addEventListener('click', function() {
            window.location.href = itemPage;
            scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            localStorage.setItem('prod', this.id);
        }));
    };

    function animationAddSome(topPointItem, item, animationToAdd, i) {
        window.addEventListener('scroll', function() {
            if (this.scrollY > topPointItem[i].offsetTop - topPointItem[i].clientHeight) {
                item[i].classList.add('animate__animated', animationToAdd);
                item[i].style.opacity = '1';
            }
        });
    };

    function animationAdd(topPointItem, item, animationToAdd) {
        window.addEventListener('scroll', function() {
            if (this.scrollY > topPointItem.offsetTop - topPointItem.clientHeight) {
                item.classList.add('animate__animated', animationToAdd);
                item.style.opacity = '1';
            };
        });
    };

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
    
        return await res.text();
    };

    function clearInputs(inputs, textarea) {
        inputs.forEach(item => {
            item.value = '';
        });
        textarea.value = '';
    };

    function sendForm(btn, inputs, textarea) {
        btn.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            btn.parentNode.appendChild(statusMessage);

            btn.classList.add('animate__animated', 'animate__fadeOut');
            setTimeout(() => btn.style.opacity = '0', 400);

            let statusImg = document.createElement('img'),
                textMessage = document.createElement('div');
            setTimeout(() => {
                statusImg.setAttribute('src', message.spinner);
                statusImg.classList.add('animate__animated', 'animate__fadeIn');
                statusMessage.classList.add('statusMessage');
                statusMessage.style.marginTop = '10px';
                statusMessage.appendChild(statusImg);
                textMessage.textContent = message.loading;
                textMessage.classList.add('textMessage');
                statusMessage.appendChild(textMessage);
            }, 400);

            const formData = new FormData(btn);

            postData('../smart.php', formData)
                .then(res => {
                    console.log(res);
                    setTimeout(() => {
                        statusImg.setAttribute('src', message.ok);
                        statusMessage.classList.add('animate__animated', 'animate__fadeIn');
                        statusMessage.classList.add('statusMessage');
                        textMessage.textContent = message.success;
                        textMessage.classList.add('animate__animated', 'animate__fadeIn', 'textMessage');
                    }, 400);
                })
                .catch(() => {
                    setTimeout(() => {
                        statusImg.remove();
                        textMessage.textContent = message.failure;
                        textMessage.classList.add('animate__animated', 'animate__fadeIn', 'failText');
                        statusMessage.classList.add('animate__animated', 'animate__fadeIn');
                        statusMessage.classList.add('statusMessage');
                    }, 400);
                })
                .finally(() => {
                    setTimeout(() => {
                        statusMessage.classList.add('animate__animated', 'animate__fadeOut');
                        setTimeout(() => {
                            statusMessage.remove();
                            clearInputs(inputs, textarea);
                        }, 400);
                        setTimeout(() => {
                            btn.style.opacity = '1';
                            btn.classList.remove('animate__fadeOut');
                            btn.classList.add('animate__fadeIn');
                        }, 400);
                    }, 5000);
                });
        });
    };



    if (document.querySelector('#index')) {
        sliderClass('.promo__slider', '.promo__wrapper', '.promo__next', '.promo__prev', window.getComputedStyle(document.querySelector('.promo__wrapper')).width, '.promo__slide');

        const sliderBtn = document.querySelectorAll('.promo__slide-btn'),
              products = document.querySelectorAll('.products__product'),
              productsBlock = document.querySelectorAll('.products__block'),
              topPointItem = document.querySelectorAll('.products__class'),
              productsBtns = document.querySelector('.products__btns'),
              aboutSection = document.querySelector('.about'),
              inputs = document.querySelectorAll('input'),
              filterBtn = document.querySelector('.products__show'),
              filterBlock = document.querySelector('.products__blockshow'),
              chevronDown = document.querySelector('.products__chevrondown'),
              caseBtn = document.querySelector('#caseBtn'),
              chargeBtn = document.querySelector('#chargeBtn'),
              bracleteBtn = document.querySelector('#braceletBtn'),
              otherBtn = document.querySelector('#otherBtn');

        filterBtn.addEventListener('click', () => {
            if (filterBlock.style.opacity == '1') {
                filterBlock.style.opacity = '0';
                filterBlock.classList.add('animate__fadeOutRightBig'); 
                filterBlock.classList.remove('animate__fadeInRightBig');
                chevronDown.style.transform = 'rotate(0deg)';
                console.log(2);
            } else {
                filterBlock.style.opacity = '1';
                filterBlock.classList.add('animate__fadeInRightBig');
                filterBlock.classList.remove('animate__fadeOutRightBig');
                chevronDown.style.transform = 'rotate(-90deg)';
            }
        });


        openPageForEach(sliderBtn, productsPage);
        openPage(headerLogo, indexPage);
        openPage(document.querySelector('.products__btn'), indexPage);
        openPage(document.querySelector('.about__btn'), aboutPage);
        scrollTop(footerLogo);
        openThisItem(products);
        animationAddSome(topPointItem, productsBlock, 'animate__fadeInLeftBig', 0);
        animationAddSome(topPointItem, productsBlock, 'animate__fadeInRightBig', 1);
        animationAddSome(topPointItem, productsBlock, 'animate__fadeInLeftBig', 2);
        animationAdd(productsBtns, document.querySelector('.products__all'), 'animate__fadeInLeftBig');
        animationAdd(productsBtns, document.querySelector('.products__btn'), 'animate__fadeInRightBig');
        animationAdd(aboutSection, document.querySelector('.about__img'), 'animate__fadeInLeftBig');
        animationAdd(aboutSection, document.querySelector('.about__title'), 'animate__fadeInDownBig');
        animationAdd(aboutSection, document.querySelector('.about__text'), 'animate__fadeInRightBig');
        animationAdd(aboutSection, document.querySelector('.about__btn'), 'animate__fadeInUpBig');
        animationAdd(document.querySelector('.question'), document.querySelector('.question__block'), 'animate__fadeIn');
        sendForm(document.querySelector('.question__form'), inputs, document.querySelector('textarea'), 'block');
    };
});