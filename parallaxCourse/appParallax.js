let input = {
    mouseX: {
        start: 100,
        end: window.innerWidth - 200,
        current: 0,
    },

    mouseY: {
        start: 0,
        end: window.innerHeight,
        current: 0,
    },
}

input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

//Event to catch Mouse Values
let handleMouseMove = function (event) {
    input.mouseX.current = event.clientX;
    input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) / input.mouseX.range;
    //Test to check Fraction Values


    input.mouseY.current = event.clientY;
    input.mouseY.fraction = (input.mouseY.current - input.mouseY.start) / input.mouseY.range;

    //Statement to turnOFF values OFF the range:
    // if (input.mouseX.fraction > 1) {
    //     input.mouseX.fraction = 1;
    // };
    // if (input.mouseX.fraction < 0) {
    //     input.mouseX.fraction = 0;
    // };

    //Test to check Fraction Values
    console.log('X Fraction:', input.mouseX.fraction)
    console.log('Y Fraction:', input.mouseY.fraction)
};

let handleResize = function () {
    input.mouseX.end = window.innerWidth - 200
    input.mouseX.range = input.mouseX.end - input.mouseX.start

    input.mouseY.end = window.innerHeight
    input.mouseY.range = input.mouseY.end - input.mouseY.start;
}

//Applying Values of Mouse in Window Obj
window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', handleResize);
