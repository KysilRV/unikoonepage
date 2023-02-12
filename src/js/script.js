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
          continueModal = document.querySelector('.continue'),
          continueLabel = document.querySelectorAll('.continue__label'),
          continueClose = document.querySelector('.continue__close'),
          continueReturn = document.querySelector('.continue__return'),
          select = document.querySelector('select'),
          productsCart = document.querySelectorAll('.products__cart'),
          productsRelative = document.querySelectorAll('.products__relative');

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
        setTimeout(() => {
            cartBtn.style.display = 'none';
        }, 400);
    });

    function cartCloseBlock(btn) {
        btn.addEventListener('click', () => {
            cartBtn.style.display = 'block';
            body.style.overflowY = 'scroll';
            cartModal.style.display = 'block';
            cartModal.classList.add('animate__fadeOut');
            cartBtn.classList.remove('animate__fadeOut');
            cartBtn.classList.add('animate__fadeIn');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 400);
            overlay.classList.add('animate__fadeOut');
        });
    };

    overlay.addEventListener('click', function(e) {
        const target = e.target;

        if (target === overlay && cartModal.classList.contains('animate__fadeIn')) {
            body.style.overflowY = 'scroll';
            cartModal.classList.add('animate__fadeOut');
            cartBtn.style.display = 'block';
            cartBtn.classList.remove('animate__fadeOut');
            cartBtn.classList.add('animate__fadeIn');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 400);
            overlay.classList.add('animate__fadeOut');
        }
    });

    continueClose.addEventListener('click', () => {
        continueModal.classList.add('animate__fadeOut');
        continueModal.classList.remove('animate__fadeIn');
        body.style.overflowY = 'scroll';
        cartBtn.classList.remove('animate__fadeOut');
        cartBtn.classList.add('animate__fadeIn');
        setTimeout(() => {
            overlay.style.display = 'none';
            cartModal.style.display = 'block';
            continueModal.style.display = 'none';
        }, 400);
        overlay.classList.add('animate__fadeOut');
    });

    function createCardBlock() {
        getResource('./db.json')
            .then(response => {
                addCart(response);
                aboutBlockModal(response);  
            })
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
              alt = block.id,
              value = localStorage.getItem(block);

        createBlock(name, price, stars, src, alt, item, localStorage.getItem(item) ? localStorage.getItem(item) : value ? value : 1, thisNum);
        setSum(cartNum);
        calcSum(document.querySelectorAll(`.cart__block`));
    });

    function addMess() {
        messageAdd.style.top = '0';
        setTimeout(() => {
            messageAdd.style.top = '-100%';
        }, 2500);
    };

    function moreInput() {
        const thisInput = cartGrid.querySelector(`#${alt}`).querySelector('.cart__input'),
              already = document.createElement('div'),
              alreadyCheck = document.querySelector('.already__text');
  
        thisInput.value++;

        if (alreadyCheck) {
            alreadyCheck.remove();
        };

        already.classList.add('already__text');
        already.textContent = `Елементів додано: ${thisInput.value}`;
        document.querySelector('.already__wrapper').append(already);

        messageAlready.style.top = '0';
        setTimeout(() => {
            messageAlready.style.top = '-100%';
        }, 2500);

        localStorage.setItem(cart.previousSibling.getAttribute('data-code'), thisInput.value);
        calcSum(document.querySelectorAll(`.cart__block`));
        setSum(cartNum);
    };

    function addCart(res) {
        productsCart.forEach(cart => {
            cart.addEventListener('click', function() {
                let value = 1;
                const thisNum = cart.previousSibling.getAttribute('data-id'),
                      code = res[thisNum].code,
                      name = res[thisNum].name,
                      price = res[thisNum].price,
                      stars = res[thisNum].stars,
                      src = res[thisNum].src,
                      alt = cart.previousSibling.id;

                if (localStorage.getItem(thisNum)) {
                    moreInput();
                    return;
                };

                addMess()

                createBlock(name, price, stars, src, alt, code, value, thisNum);
                calcSum(document.querySelectorAll(`.cart__block`));

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

        document.querySelectorAll('.cart__input').forEach(input => {
            input.addEventListener('input', () => {
                input.value = input.value.replace(/\D/g, '');
            });
            input.addEventListener('input', function() {
                if (this.value <= 0) {
                    this.value = 1;
                };
                calcSum(document.querySelectorAll('.cart__block'));
            });
        });

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
        const end = document.querySelector('.cart__endPrice');
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
        const end = document.querySelector('.cart__endPrice');
        sum -= +price.slice(0, -4);
        end.textContent = `${sum} грн`;
    };

    function setSum(variable) {
        let num = 0;
        const end = document.querySelector('.cart__endPrice');
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
    };

    function removeBlock(btn) {
        btn.addEventListener('click', function() {
            let num = 0;
            const end = document.querySelector('.cart__endPrice'),
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

            setSum(cartNum);
            sum -= +value * price;
            end.textContent = `${sum} грн`;
            if (sum <= 0) {
                end.textContent = `--- грн`;
                addNotFound(num, end);
                setSum(cartNum);
            };
        });
    };
    
    function filter(btn, theme, removeAn, showSelector) {
        btn.addEventListener('click', () => {
            productsBlock.forEach(prod => {
                setTimeout(() => {
                    prod.style.display = 'none';
                }, 400);
                prod.classList.add('animate__fadeOut');
                prod.style.opacity = '0';
                theme.classList.remove('animate__fadeOut');
                theme.classList.remove(removeAn);
                setTimeout(() => {
                    theme.style.display = 'block';
                    theme.classList.add('animate__fadeIn');
                    prod.style.opacity = '1';
                }, 400);
                theme.querySelectorAll(showSelector).forEach(prod => prod.style.display = 'block');
                clearTimeout(animationAddSome);
            });
        });
    };

    function returnToNormal() {
        returnBtn.addEventListener('click', () => {
            productsRelative.forEach(prod => {
                prod.classList.add('animate__fadeOut');
                prod.style.display = 'none';
                prod.classList.remove('animate__fadeIn');
            });
            productsBlock.forEach(item => {
                item.classList.remove('animate__fadeOut');
                item.classList.add('animate__fadeIn');
                item.style.display = 'block'
            });
            if (document.querySelector('.container').clientWidth <= 960) {
                start.forEach(item => {
                    item.classList.add('animate__fadeIn');
                    item.style.display = 'block';
                    item.classList.remove('animate__fadeOut');
                    for (let i = 0; i < start.length - 2; ++i) {
                        i += 2;
                        start[i].style.display = 'none';
                    }
                });
                console.log(1)
            } else {
                start.forEach(item => {
                    item.classList.add('animate__fadeIn');
                    item.style.display = 'block';
                    item.classList.remove('animate__fadeOut');
                });
            }
        });
    };

    function removeFilter(btn) {
        btn.addEventListener('click', () => {
            productsRelative.forEach(prod => {
                prod.style.display = 'block'
                prod.classList.remove('animate__fadeOut');
                prod.classList.add('animate__fadeIn');
            });
            productsBlock.forEach(prod => {
                prod.style.display = 'block'
                prod.classList.remove('animate__fadeOut');
                prod.classList.add('animate__fadeIn');
            });
        });
    };

    const mask = (selector) => {

        let setCursorPosition = (pos, elem) => {
            elem.focus();
    
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
    
        function createMask(e) {
            let matrix = '+38 (___) ___ __ __',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
    
            if (def.length >= val.length) {
                val = def;
            }
    
            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
    
            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }
    
        let inputs = document.querySelectorAll(selector);
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
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

    function sendForm(btn, inputs, textarea, option) {
        btn.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            btn.parentNode.appendChild(statusMessage);

            btn.classList.add('animate__animated', 'animate__fadeOut');
            setTimeout(() => {
                btn.style.opacity = '0';
                btn.style.visibility = 'hidden';
            }, 400);

            let statusImg = document.createElement('img'),
                textMessage = document.createElement('div');
            setTimeout(() => {
                statusImg.setAttribute('src', message.spinner);
                statusImg.classList.add('animate__animated', 'animate__fadeIn');
                statusMessage.classList.add('statusMessage');
                option ? statusMessage.style.marginTop = '60px' : statusMessage.style.marginTop = '10px';
                statusMessage.appendChild(statusImg);
                textMessage.textContent = message.loading;
                textMessage.classList.add('textMessage');
                statusMessage.appendChild(textMessage);
            }, 400);

            const formData = new FormData(btn);

            if (option) {
                let products = [];
                const names = document.querySelectorAll('.cart__name'),
                      num = document.querySelectorAll('.cart__input')

                for (let i = 0; i < names.length; i++) {
                    products.push(`${names[i].textContent} (${num[i].value})`);
                };

                console.log(products.join(', '));

                formData.append("user_payment", select.value);
                formData.append("user_products", products.join(', '));
                formData.append("user_price", document.querySelector('.cart__endPrice').textContent);
            };

            postData('../mailer/smart.php', formData)
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
                            btn.style.visibility = 'visible';
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
            chevronDown.style.transform = 'rotate(0deg)';
        } else {
            filterBlock.style.opacity = '1';
            chevronDown.style.transform = 'rotate(-90deg)';
        };
    });

    btnPay.addEventListener('click', () => {
        cartModal.style.display = 'none';
        cartModal.classList.add('animate__fadeOut');
        cartModal.classList.remove('animate__fadeIn');
        continueModal.style.display = 'block';
        continueModal.classList.add('animate__fadeIn');
        continueModal.classList.remove('animate__fadeOut');
    });

    continueReturn.addEventListener('click', () => {
        continueModal.style.display = 'none';
        continueModal.classList.add('animate__fadeOut');
        continueModal.classList.remove('animate__fadeIn');
        cartModal.style.display = 'block';
        cartModal.classList.add('animate__fadeIn');
        cartModal.classList.remove('animate__fadeOut');
    });

    continueModal.addEventListener('click', (e) => {
        const target = e.target;

        if (target.classList.contains('continue__input')) {
            continueLabel.forEach(label => label.style.filter = 'brightness(100%)');
            target.previousSibling.style.filter = 'brightness(25%)';
        } else {
            continueLabel.forEach(label => label.style.filter = 'brightness(100%)');
        }
    });

    function onlyNums(inputSelector) {
        const input = document.querySelector(inputSelector);
        
        input.addEventListener('input', () => {
            input.value = input.value.replace(/\D/g, '');
        });
    };

    function aboutBlockModal(res) {
        products.forEach(prod => {
            prod.addEventListener('click', function(e) { 
                const thisNum = prod.getAttribute('data-id'),
                      name = res[thisNum].name,
                      src = res[thisNum].src,
                      descr = res[thisNum].descr,
                      country = res[thisNum].country,
                      use = res[thisNum].use,
                      color = res[thisNum].color,
                      material = res[thisNum].material,
                      alt = prod.id,
                      code = prod.getAttribute('data-code'),
                      value = localStorage.getItem(code),
                      stars = res[thisNum].stars,
                      block = document.querySelector('.aboutBlock'),
                      price = prod.querySelector('.products__price').textContent,
                      check = res[thisNum].cabel ?  `Довжина:` : res[thisNum].chargeBlock ? `Тип виходу:` : `Матеріал:`;

                block.innerHTML = `
                    <div class="aboutBlock__remove">
                        <button class="aboutBlock__close"><img src="icons/close.svg" alt="close"></button>
                        <h2 class="aboutBlock__title">${name}</h2>
                        <div class="aboutBlock__wrapper">
                            <img class="aboutBlock__img" src="${src}" alt="${alt}"/>
                            <div class="aboutBlock__grid">
                                <h3 class="aboutBlock__about">О товаре:</h3>
                                <p class="aboutBlock__text">${descr}</p>
                                <h3 class="aboutBlock__options">Характеристики:</h3>
                                <div class="aboutBlock__item">
                                    <div class="aboutBlock__key">Країна виробник:</div>
                                    <div class="aboutBlock__country">${country}</div>
                                </div>
                                <div class="aboutBlock__item">
                                    <div class="aboutBlock__key">Колір:</div>
                                    <div class="aboutBlock__country">${color}</div>
                                </div>
                                <div class="aboutBlock__item">
                                    <div class="aboutBlock__key">Призначення:</div>
                                    <div class="aboutBlock__country">${use}</div>
                                </div>
                                <div class="aboutBlock__item">
                                    <div class="aboutBlock__key">${check}</div>
                                    <div class="aboutBlock__country">${material}</div>
                                </div>
                                <div class="aboutBlock__item">
                                    <div class="aboutBlock__key price">Ціна:</div>
                                    <div class="aboutBlock__country price">${price}</div>
                                </div>
                            </div>
                        </div>
                        <div class="aboutBlock__btns">
                            <button class="aboutBlock__return">Повернутися</button>
                            <button class="aboutBlock__cart">У кошик!</button>
                        </div>
                    </div>
                `;
                const info = document.querySelector('.aboutBlock');

                body.style.overflowY = 'hidden';
                overlay.classList.add('animate__fadeIn');
                overlay.classList.remove('animate__fadeOut');
                overlay.style.display = 'block';
                cartModal.style.display = 'none'
                info.style.display = 'block';
                info.classList.remove('animate__fadeOut');
                info.classList.add('animate__fadeIn');
                cartBtn.classList.remove('animate__fadeIn');
                cartBtn.classList.add('animate__fadeOut');
                setTimeout(() => {
                    cartBtn.style.display= 'none';
                }, 400);

                document.querySelector('.aboutBlock__cart').addEventListener('click', () => {
                    cart.forEach(item => {
                        createBlock(name, price, stars, src, alt, code, localStorage.getItem(item) ? localStorage.getItem(item) : value ? value : 1, thisNum);
                        closeInfo();

                    });
                });

                function closeInfo() {
                    body.style.overflowY = 'visible';
                    overlay.classList.remove('animate__fadeIn');
                    overlay.classList.add('animate__fadeOut');
                    info.classList.add('animate__fadeOut');
                    info.classList.remove('animate__fadeIn');
                    cartBtn.style.display= 'block';
                    cartBtn.classList.add('animate__fadeIn');
                    cartBtn.classList.remove('animate__fadeOut');
                    setTimeout(() => {
                        cartModal.style.display = 'block';
                        this.parentNode.remove();
                        overlay.style.display = 'none';
                        info.style.display = 'none';
                    }, 400);
                };

                document.querySelector('.aboutBlock__close').addEventListener('click', function() {
                    closeInfo();
                });

                overlay.addEventListener('click', (e) => {
                    if (e.target == document.querySelector('.overlay')) {
                        body.style.overflowY = 'scroll';
                        info.classList.remove('aanimate__fadeOut');
                        info.classList.add('animate__fadeOut');
                        cartBtn.style.display= 'block';
                        cartBtn.classList.add('animate__fadeIn');
                        cartBtn.classList.remove('animate__fadeOut');
                        setTimeout(() => {
                            overlay.style.display = 'none';
                            info.style.display = 'none';
                            cartModal.style.display = 'block';
                        }, 400);
                        overlay.classList.add('animate__fadeOut');
                    };
                });

                document.querySelector('.aboutBlock__return').addEventListener('click', () => {
                    block.classList.add('animate__fadeOut');
                    block.classList.remove('animate__fadeIn');
                    overlay.classList.add('animate__fadeOut');
                    body.style.overflowY = 'scroll';
                    cartBtn.style.display= 'block';
                    cartBtn.classList.add('animate__fadeIn');
                    cartBtn.classList.remove('animate__fadeOut');
                    setTimeout(() => {
                        block.style.display = 'none';
                        overlay.style.display = 'none';
                        cartModal.style.display = 'block';
                        cartModal.classList.add('animate__fadeIn');
                        cartModal.classList.remove('animate__fadeOut');
                    }, 400);
                });
            });
        });
    }; 

    cartCloseBlock(cartClose);
    cartCloseBlock(document.querySelector('.cart__continue'));
    mask('.continue__phoneInput');
    onlyNums('.continue__phoneInput');
    onlyNums('.continue__locationInput');
    createCardBlock()
    animationAddSome(topPointItem, productsBlock, 0);
    animationAddSome(topPointItem, productsBlock, 1);
    animationAddSome(topPointItem, productsBlock, 2);
    animationAddSome(topPointItem, productsBlock, 3);
    filter(caseBtn, caseBlock, 'animate__fadeInLeftBig', '.products__relative');
    filter(cabelBtn, cabelBlock, 'animate__fadeInRightBig', '.products__relative');
    filter(otherBtn, otherBlock, 'animate__fadeInLeftBig', '.products__relative');
    filter(bracleteBtn, bracleteBlock, 'animate__fadeInRightBig', '.products__relative');
    removeFilter(allBtn);
    returnToNormal();
    openPage(headerLogo, indexPage);
    openPage(footerLogo, indexPage);
    animationAdd(aboutSection, document.querySelector('.about__img'), 'animate__fadeInLeftBig');
    animationAdd(aboutSection, document.querySelector('.about__title'), 'animate__fadeInDownBig');
    animationAdd(aboutSection, document.querySelector('.about__text'), 'animate__fadeInRightBig');
    animationAdd(document.querySelector('.question'), document.querySelector('.question__block'), 'animate__fadeIn');
    sendForm(document.querySelector('.question__form'), inputs, document.querySelector('textarea'), false);
    sendForm(document.querySelector('.continue__form'), document.querySelectorAll('.continue__input'), document.querySelector('.continue__textarea'), true);
    sliderClass('.promo__slider', '.promo__wrapper', '.promo__next', '.promo__prev', window.getComputedStyle(document.querySelector('.promo__wrapper')).width, '.promo__slide');
});