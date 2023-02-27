

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
    // pointer events
    slide.addEventListener('pointerdown', pointerDown(index))
    slide.addEventListener('pointerup', pointerUp)
    slide.addEventListener('pointerleave', pointerUp)
    slide.addEventListener('pointermove', pointerMove)
})

slides_bg.forEach((slide_bg, index) => {
    const slideImage = slide_bg.querySelector('img')
    // disable default image drag
    slideImage.addEventListener('dragstart', (e) => e.preventDefault())
    // pointer events
    slide_bg.addEventListener('pointerdown', pointerDown(index))
    slide_bg.addEventListener('pointerup', pointerUp)
    slide_bg.addEventListener('pointerleave', pointerUp)
    slide_bg.addEventListener('pointermove', pointerMove)
})

// make responsive to viewport changes
window.addEventListener('resize', setPositionByIndex)

// prevent menu popup on long press
window.oncontextmenu = function (event) {
    event.preventDefault()
    event.stopPropagation()
    return false
}

// use a HOF so we have index in a closure
function pointerDown(index) {
    return function (event) {
        currentIndex = index
        startPos = event.clientX
        isDragging = true
        animationID = requestAnimationFrame(animation)
        slider.classList.add('grabbing')
    }
}

function pointerMove(event) {
    if (isDragging) {
        const currentPosition = event.clientX
        currentTranslate = prevTranslate + currentPosition - startPos
    }
}

function pointerUp() {
    cancelAnimationFrame(animationID)
    isDragging = false

    const movedBy = currentTranslate - prevTranslate

    // if moved enough negative then snap to next slide if there is one
    if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1

    // if moved enough positive then snap to previous slide if there is one
    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1

    setPositionByIndex()

    slider.classList.remove('grabbing')
}



function animation() {
    setSliderPosition()
    if (isDragging) requestAnimationFrame(animation)
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth
    prevTran
    slate = currentTranslate
    setSliderPosition()
}

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`
    let BGTranslate = currentTranslate * 1.1
    slider_BG.style.transform = `translateX(${BGTranslate}px)`
}
