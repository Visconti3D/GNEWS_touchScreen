

const slider = document.querySelector('.slider-container'),
    slides = Array.from(document.querySelectorAll('.slide'));

const slider_BG = document.querySelector('.slider-bg'),
    slides_bg = Array.from(document.querySelectorAll('.slide_bg'));

// set up our state
let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    currentIndex = 0

// add our event listeners
slides.forEach((slide, index) => {
    const slideImage = slide.querySelector('img')
    // disable default image drag
    slideImage.addEventListener('dragstart', (e) => e.preventDefault())
    // touch events
    slide.addEventListener('touchstart', touchStart(index))
    slide.addEventListener('touchend', touchEnd)
    slide.addEventListener('touchmove', touchMove)

    // Mouse events
    slide.addEventListener('mousedown', touchStart(index))
    slide.addEventListener('mouseup', touchEnd)
    slide.addEventListener('mouseleave', touchEnd)
    slide.addEventListener('mousemove', touchMove)
})

slides_bg.forEach((slide_bg, index) => {
    const slideImage = slide_bg.querySelector('img')
    // disable default image drag
    slideImage.addEventListener('dragstart', (e) => e.preventDefault())
    // touch events
    slide_bg.addEventListener('touchstart', touchStart(index))
    slide_bg.addEventListener('touchend', touchEnd)
    slide_bg.addEventListener('touchmove', touchMove)

    // Mouse events
    slide_bg.addEventListener('mousedown', touchStart(index))
    slide_bg.addEventListener('mouseup', touchEnd)
    slide_bg.addEventListener('mouseleave', touchEnd)
    slide_bg.addEventListener('mousemove', touchMove)
})

// make responsive to viewport changes
//window.addEventListener('resize', setPositionByIndex)

// prevent menu popup on long press
window.oncontextmenu = function (event) {
    event.preventDefault()
    event.stopPropagation()
    return false
}

// use a HOF so we have index in a closure
function touchStart(index) {
    return function (event) {
        isDragging = true
        currentIndex = index
        animationID = requestAnimationFrame(animation)
        startPos = getPositionX(event)
        slider.classList.add('grabbing')
    }
}

function touchEnd() {
    isDragging = false
    cancelAnimationFrame(animationID)
    slider.classList.remove('grabbing')
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event)
        currentTranslate = prevTranslate + currentPosition - startPos
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX
}

function animation() {
    setSliderPosition()
    if (isDragging) requestAnimationFrame(animation)
}

//function setPositionByIndex() {
//    currentTranslate = currentIndex * -window.innerWidth
//    prevTran
//    slate = currentTranslate
//    setSliderPosition()
//}

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`
    let BGTranslate = currentTranslate * 1.1
    slider_BG.style.transform = `translateX(${BGTranslate}px)`
}
