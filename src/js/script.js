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

    let cart = [],
        cartNumber = 0,
        sum = 0;

    const indexPage = 'index.html',
          body = document.querySelector('body'),
          footerLogo = document.querySelector('.footer__logo'),
          headerLogo = document.querySelector('.header__logo'),
          products = document.querySelectorAll('.products__product'),
          productsBlock = document.querySelectorAll('.products__block'),
          topPointItem = document.querySelectorAll('.products__class'),
          aboutSection = document.querySelector('.about'),
          inputs = document.querySelectorAll('input'),
          filterBtn = document.querySelector('.products__show'),
          filterBlock = document.querySelector('.products__blockshow'),
          chevronDown = document.querySelector('.products__chevrondown'),
          caseBtn = document.querySelector('#caseBtn'),
          caseBlock = document.querySelector('.case'),
          cabelBtn = document.querySelector('#chargeBtn'),
          cabelBlock = document.querySelector('.cabel'),
          bracleteBtn = document.querySelector('#braceletBtn'),
          bracleteBlock = document.querySelector('.braclete'),
          otherBtn = document.querySelector('#otherBtn'),
          otherBlock = document.querySelector('.other'),
          allBtn = document.querySelector('#allBtn'),
          returnBtn = document.querySelector('#returnBtn'),
          start = document.querySelectorAll('.start'),
          cartNum = document.querySelector('.header__num'),
          cartGrid = document.querySelector('.cart__grid'),
          btnPay = document.querySelector('.cart__pay'),
          cartNotFoundImg = document.querySelector('.cart__nothing'),
          cartNotFoundText = document.querySelector('.cart__notFound'),
          cartBtn = document.querySelector('.header__block'),
          cartModal = document.querySelector('.cart'),
          overlay = document.querySelector('.overlay'),
          cartClose = document.querySelector('.cart__close'),
          messageAdd = document.querySelector('.add'),
          messageAlready = document.querySelector('.already'),
          continueInput = document.querySelectorAll('.continue__input');

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

    function scrollTo(btn) {
        btn.addEventListener('click', () => {
            scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        });
    }

    function animationAddSome(topPointItem, item, i) {
        window.addEventListener('scroll', function() {
            if (this.scrollY > topPointItem[i].offsetTop - topPointItem[i].clientHeight) {
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

    cartBtn.addEventListener('click', function() {
        body.style.overflowY = 'hidden';
        this.classList.add('animate__fadeOut');
        this.classList.remove('aimate__fadeIn');
        cartBtn.classList.remove('animate__fadeIn');
        cartModal.classList.add('animate__fadeIn');
        cartModal.classList.remove('animate__fadeOut');
        overlay.classList.add('animate__fadeIn');
        overlay.classList.remove('animate__fadeOut');
        overlay.style.display = 'block';
    });

    function cartCloseBlock(btn) {
        btn.addEventListener('click', () => {
            body.style.overflowY = 'scroll';
            cartModal.classList.add('animate__fadeOut');
            cartBtn.classList.remove('animate__fadeOut');
            cartBtn.classList.add('animate__fadeIn');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 400);
            overlay.classList.add('animate__fadeOut');
        });
    };

    cartCloseBlock(cartClose);
    cartCloseBlock(document.querySelector('.cart__continue'));

    function createCardBlock() {
        getResource('./db.json')
            .then(response => addCart(response))
            .catch(error => console.log(error));
    };

    cart = [];

    for (let i = 0; i < 20; i++) {
        if (localStorage.getItem(i)) {
            cart.push(localStorage.getItem(i))
        };
    };

    if (cart.length > 0) {
        removeNotFound();
    };

    setSum(cartNum);

    cart.forEach(item => {
        const block = document.querySelector(`[data-code="${item}"]`),
              thisNum = block.getAttribute('data-id'),
              name = block.querySelector('.products__name').textContent,
              price = block.querySelector('.products__price').textContent,
              stars = block.querySelector('.products__num').textContent,
              src = block.querySelector('.products__img').getAttribute('src'),
              alt = block.id;

        createBlock(name, price, stars, src, alt, item, localStorage.getItem(item) ? localStorage.getItem(item) : 1, thisNum);
        setSum(cartNum);
        calcSum(document.querySelectorAll(`.cart__block`));
    });

    function addCart(res) {
        products.forEach(prod => {
            prod.addEventListener('click', function() {
                let value = 1;
                const thisNum = prod.getAttribute('data-id'),
                      code = res[thisNum].code,
                      name = res[thisNum].name,
                      price = res[thisNum].price,
                      stars = res[thisNum].stars,
                      src = res[thisNum].src,
                      alt = prod.id;

                if (localStorage.getItem(thisNum)) {
                    messageAlready.style.top = '0';
                    setTimeout(() => {
                        messageAlready.style.top = '-100%';
                    }, 2500);
                    return;
                }
                createBlock(name, price, stars, src, alt, code, value, thisNum);
                calcSum(document.querySelectorAll(`.cart__block`));

                messageAdd.style.top = '0';
                setTimeout(() => {
                    messageAdd.style.top = '-100%';
                }, 2500);

                setSum(cartNum);

                localStorage.setItem(thisNum, code);
            });
        });
    };

    function createBlock(name, price, stars, src, alt, code, value, thisNum) {
        let card = document.createElement('div');
    
        card.classList.add('cart__block');
        card.setAttribute('id', alt);
        card.setAttribute('data-id', thisNum);
        card.setAttribute('data-code', code);

        card.innerHTML = `
            <img src="icons/close.svg" alt="close" class="cart__closeBlock">
            <img src=${src} alt=${alt} class="cart__img">
            <div class="cart__info">
                <div class="cart__name">${name}</div>
                <div class="cart__more">
                    <div class="cart__mark">
                        <img src="icons/star.svg" alt="star" class="cart__star">
                        <div class="cart__num">${stars}</div>
                    </div>
                    <div class="cart__lot">
                        <button class="cart__minus">-</button>
                        <input type="text" class="cart__input" value=${value}>
                        <button class="cart__plus">+</button>
                    </div>
                    <div class="cart__price">${price}</div>
                </div>
            </div>
        `;

        cartGrid.appendChild(card);

        removeNotFound();
        removeBlock(card.querySelector('.cart__closeBlock'));

        const thisLot = card.querySelector('.cart__lot');
                
        thisLot.addEventListener('click', function(e) {
            const target = e.target,
                  cartPlus = this.querySelector('.cart__plus'),
                  cartMinus = this.querySelector('.cart__minus'),
                  cartInput = this.querySelector('.cart__input'),
                  thisCartBlock = this.closest('.cart__block');
            
            if (target === cartPlus) {
                ++cartInput.value;
                localStorage.setItem(code, cartInput.value);
                setSum(cartNum);
                calcSum(document.querySelectorAll(`.cart__block`));
            } else if (target === cartMinus) {
                --cartInput.value;
                localStorage.setItem(code, cartInput.value);
                setSum(cartNum);
                sumMinus(price);
                if (cartInput.value <= 0) {
                    thisCartBlock.remove();
                    setSum(cartNum);
                    localStorage.removeItem(thisNum);
                    localStorage.removeItem(code);
                };
            };
        });
    };

    function calcSum(blocks) {
        const end = document.querySelector('.card__endPrice');
        sum = 0;
        if (blocks) {
            blocks.forEach(block => {
                const input = +block.querySelector('.cart__input').value,
                      price = +block.querySelector('.cart__price').textContent.slice(0, -4);

                sum += price * input;
            });
            end.textContent = `${sum} грн`;
        } else {
            end.textContent = `--- грн`;
        };
    };

    function sumMinus(price) {
        const end = document.querySelector('.card__endPrice');
        sum -= +price.slice(0, -4);
        end.textContent = `${sum} грн`;
    };

    function setSum(variable) {
        let num = 0;
        const end = document.querySelector('.card__endPrice');
        const inputs = document.querySelectorAll('.cart__input');
    
        inputs.forEach(input => {
            num = +input.value + num;
        });

        variable.textContent = num;

        addNotFound(num, end);
    };

    function removeNotFound() {
        if (cartNumber >= 0) {
            cartNotFoundImg.style.display = 'none';
            cartNotFoundText.style.display = 'none';
            btnPay.style.visibility= 'visible';
        };
    };

    function addNotFound(num, end) {
        if (num <= 0) {
            end.textContent = `--- грн`;
            cartNotFoundImg.style.display = 'block';
            cartNotFoundText.style.display = 'block';
            btnPay.style.visibility= 'hidden';

            cartNotFoundImg.classList.remove('animate__fadeOut');
            cartNotFoundImg.classList.add('animate__fadeIn');
            cartNotFoundText.classList.remove('animate__fadeOut');
            cartNotFoundText.classList.add('animate__fadeIn');
            btnPay.classList.add('animate__fadeOut');
            btnPay.classList.remove('animate__fadeIn');
        } else {
            btnPay.style.visibility= 'visible';
            btnPay.classList.remove('animate__fadeOut');
            btnPay.classList.add('animate__fadeIn');
        }
    }

    function removeBlock(btn) {
        btn.addEventListener('click', function() {
            let num = 0;
            const end = document.querySelector('.card__endPrice'),
                    inputs = document.querySelectorAll('.cart__input'),
                    thisBlock = this.parentNode,
                    value = thisBlock.querySelector('.cart__input').value,
                    price = thisBlock.querySelector('.cart__price').textContent.slice(0, -4);
            
            inputs.forEach(input => {
                num = +input.value + num;
            });

            thisBlock.remove();
            localStorage.removeItem(thisBlock.getAttribute('data-id'));
            localStorage.removeItem(thisBlock.getAttribute('data-code'));

            sum -= +value * price;
            console.log(+value * price)
            end.textContent = `${sum} грн`;
            if (sum <= 0) {
                end.textContent = `--- грн`;
                addNotFound(num, end);
                setSum(cartNum);
            };
        });
    };

    btnPay.addEventListener('click', () => {
        
    });

    function filter(btn, theme, removeAn, showSelector) {
        btn.addEventListener('click', () => {
            productsBlock.forEach(prod => {
                setTimeout(() => {
                    prod.classList.add('displayNone');
                    prod.classList.remove('displayBlock');
                }, 400);
                prod.classList.add('animate__fadeOut');
                prod.style.opacity = '0';
                theme.classList.remove('animate__fadeOut');
                theme.classList.remove('displayNone');
                theme.classList.remove(removeAn);
                setTimeout(() => {
                    theme.classList.add('displayBlock');
                    theme.classList.add('animate__fadeIn');
                    prod.style.opacity = '1';
                }, 400);
                theme.querySelectorAll(showSelector).forEach(prod => prod.classList.add('displayBlock'));
                clearTimeout(animationAddSome);
            });
        });
    };

    function returnToNormal() {
        returnBtn.addEventListener('click', () => {
            products.forEach(prod => {
                prod.classList.add('animate__fadeOut');
                prod.classList.add('displayNone');
                prod.classList.remove('animate__fadeIn');
                prod.classList.remove('displayBlock');
            });
            productsBlock.forEach(item => {
                item.classList.remove('animate__fadeOut');
                item.classList.remove('displayNone');
                item.classList.add('animate__fadeIn');
                item.classList.add('displayBlock');
            });
            start.forEach(item => {
                item.classList.add('animate__fadeIn');
                item.classList.add('displayBlock');
                item.classList.remove('animate__fadeOut');
                item.classList.remove('displayNone');
            });
        });
    };

    function removeFilter(btn) {
        btn.addEventListener('click', () => {
            productsBlock.forEach(prod => {
                prod.classList.add('displayBlock');
                prod.classList.remove('animate__fadeOut');
                prod.classList.add('animate__fadeIn');
                prod.classList.remove('displayNone');
            });
        });
    };

    const getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
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

    filterBtn.addEventListener('click', () => {
        if (filterBlock.style.opacity == '1') {
            filterBlock.style.opacity = '0';
            filterBlock.classList.add('animate__fadeOutRightBig'); 
            filterBlock.classList.remove('animate__fadeInRightBig');
            chevronDown.style.transform = 'rotate(0deg)';
        } else {
            filterBlock.style.opacity = '1';
            filterBlock.classList.add('animate__fadeInRightBig');
            filterBlock.classList.remove('animate__fadeOutRightBig');
            chevronDown.style.transform = 'rotate(-90deg)';
        }
    });

    products.forEach(prod => {
        prod.addEventListener('mouseenter', () => {
            const cart = prod.querySelector('.products__cart');
            cart.classList.add('animate__heartBeat');
            cart.style.opacity = '1';
        });
        prod.addEventListener('mouseleave', () => {
            const cart = prod.querySelector('.products__cart');
            cart.classList.remove('animate__heartBeat');
            cart.style.opacity = '0';
        });
    });

    continueInput.forEach(input => {
        input.addEventListener('click', function() {
            console.log(this.previousSibling);
        });
    });

    createCardBlock()
    animationAddSome(topPointItem, productsBlock, 0);
    animationAddSome(topPointItem, productsBlock, 1);
    animationAddSome(topPointItem, productsBlock, 2);
    animationAddSome(topPointItem, productsBlock, 3);
    filter(caseBtn, caseBlock, 'animate__fadeInLeftBig', '.products__product');
    filter(cabelBtn, cabelBlock, 'animate__fadeInRightBig', '.products__product');
    filter(otherBtn, otherBlock, 'animate__fadeInLeftBig', '.products__product-other');
    filter(bracleteBtn, bracleteBlock, 'animate__fadeInRightBig', '.products__product');
    removeFilter(allBtn);
    returnToNormal();
    openPage(headerLogo, indexPage);
    openPage(footerLogo, indexPage);
    animationAdd(aboutSection, document.querySelector('.about__img'), 'animate__fadeInLeftBig');
    animationAdd(aboutSection, document.querySelector('.about__title'), 'animate__fadeInDownBig');
    animationAdd(aboutSection, document.querySelector('.about__text'), 'animate__fadeInRightBig');
    animationAdd(document.querySelector('.question'), document.querySelector('.question__block'), 'animate__fadeIn');
    sendForm(document.querySelector('.question__form'), inputs, document.querySelector('textarea'), 'block');
    sliderClass('.promo__slider', '.promo__wrapper', '.promo__next', '.promo__prev', window.getComputedStyle(document.querySelector('.promo__wrapper')).width, '.promo__slide');
});