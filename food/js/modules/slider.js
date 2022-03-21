function slider({container, slide, prevArrow, nextArrow, totalCount, currentCounter, wrapper, field}) {
    //Slider

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCount),
        current = document.querySelector(currentCounter),
        slidersWrapper = document.querySelector(wrapper),
        slidersField = document.querySelector(field),
        width = window.getComputedStyle(slidersWrapper).width;

    let sliderIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${sliderIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = sliderIndex;
    }

    slidersField.style.width = 100 * slides.length + '%';
    slidersField.style.display = 'flex';
    slidersField.style.transition = '0.5s all';

    slidersWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        if (i == 0) {
            dot.classList.add('active');
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function currentNumber(currentNum) {
        if (slides.length < 10) {
            current.textContent = `0${currentNum}`;
        } else {
            current.textContent = currentNum;
        }
    }

    function dotsActive() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[sliderIndex - 1].style.opacity = '1';
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        slidersField.style.transform = `translateX(-${offset}px)`;

        if (sliderIndex == slides.length) {
            sliderIndex = 1;
        } else {
            sliderIndex++;
        }
        currentNumber(sliderIndex);

        dotsActive();

    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        slidersField.style.transform = `translateX(-${offset}px)`;

        if (sliderIndex == 1) {
            sliderIndex = slides.length;
        } else {
            sliderIndex--;
        }
        currentNumber(sliderIndex);

        dotsActive();

    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            sliderIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidersField.style.transform = `translateX(-${offset}px)`;

            currentNumber(sliderIndex);

            dotsActive();
        });
    });

    // showSlides(sliderIndex);

    // if(slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if(n > slides.length) {
    //         sliderIndex = 1;
    //     } 

    //     if(n < 1) {
    //         sliderIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');

    //     slides[sliderIndex - 1].style.display = "block";

    //     if(slides.length < 10) {
    //         current.textContent = `0${sliderIndex}`;
    //     } else {
    //         current.textContent = sliderIndex;
    //     }
    // }

    // function plusSliders(n) {
    //     showSlides(sliderIndex += n);
    // }

    // prev.addEventListener('click', () => {
    //     plusSliders(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSliders(1);
    // });
}

export default slider;