// CALCULATOR

// TOP suggested to avoid using calc() and eval() and so this is what i 
// came up with as a solution for my calculator.

// Based on my location we use use , in stead of . 


const symbols = ['C', '7', '4', '1', '0', '±', '8', '5',
                '2', '.', '%', '9', '6', '3', '⌫', '÷',
                '×', '-', '+', '='];

const basicBtn = document.querySelector('.Buttons');


let s = 0;
for (let i = 1; i < 5; i++) {
    // create the 4 divs for our columns
    let btnColumn = document.createElement('div');
    btnColumn.setAttribute('class', 'column' + i);
    basicBtn.appendChild(btnColumn);

    // create the actual buttons of our calculator,
    // also adding their symbol (as value, id and textContent)
    for (let j = 1; j < 6; j++) {
        let btn = document.createElement('button');
        btn.setAttribute('class', 'btn');
        btn.setAttribute('id', symbols[s]);
        btn.value = symbols[s];
        btn.textContent = symbols[s];
        btnColumn.appendChild(btn);
        s++;
    }
};

// replace the . with , on our button
const comma = document.getElementById('.');
comma.textContent = ',';



// get the display element
const displayValue = document.getElementById('displayWindow');
// select all buttons
const button = document.querySelectorAll('.btn');
// create a variable to keep track of the number that has to be shown to the user
let currentNumber = '';
// create a variable that's needed to store the whole operation
let currentValue = '';
// create a variable that's needed to store the ongoing calculation
let showOperation = '';


// Add an Event Listener for each button that does different things based on their value.
button.forEach(el => el.addEventListener('click', () => { 

    // if the value is not NaN it's a number which is displayed when clicked on it
    if (!isNaN(el.value)) {
        // ignore input if the length of our number is longer than 17
        if (currentNumber.length > 17) { return };
        // reset font size and background if needed
        if (currentNumber.length < 12) { displayValue.style.fontSize = '40px' };
        document.getElementById('mainDiv').style.background = '';

        // add the number to the current number that is displayed 
        currentNumber += el.value;
        // print the number on screen
        display();


    } else if (el.value === 'C') {
        // reset everything when C is pressed
        document.getElementById('mainDisplay').style.backgroundImage = '';
        displayValue.style.fontSize = '40px'
        currentValue = '';
        currentNumber = '';
        // show nothing / clear the calculator's display
        displayValue.textContent = '0';
        document.getElementById('currentCalculation').textContent = '';


    } else if (el.value === '±') {
        // get the negative number by subtracting the double of it
        // it also works from negative to positive ;)
        currentNumber -= currentNumber * 2;
        display();


    } else if (el.value === '%') {
        // divide the number by 100 to get the percentage
        currentNumber = currentNumber / 100;
        display();


    } else if (el.value === '=') {
        // replace the operators with the ones understood by JS
        currentValue += currentNumber;
        currentValue = currentValue.replace(/×/g, '*').replace(/÷/g, '/');
        // remove the operator if it's the last character of the current operation (currentValue)
        if (currentValue.charAt(currentValue.length - 1) === ' ') {
            currentValue = currentValue.slice(0, -3);
        }

        const myArr = currentValue.split(' ');

        // handle the division by zero with a meme ;)
        console.log(myArr.at(-1), myArr.at(-2))
        if (myArr.at(-1) === '0' && myArr.at(-2) === '/') {
            const lol = document.getElementById('mainDisplay')
            lol.style.backgroundImage = 'url(./Images/lol.gif)';
            lol.style.backgroundSize = '100% 100%';
            lol.style.backgroundRepeat = 'no-repeat'
        }

        function calculate() {
        // after storing the operation in an array a loop will solve the multiplication and
        // division first. The function then stops and it's called again from a while loop
        // to solve the addition and subtraction until the array is left with only one number.
            if (myArr.includes('*') || myArr.includes('/')) {
                for (let i = 0; i < myArr.length; i++) {
                    if (myArr[i] === '*' || myArr[i] === '/') {
                        currentNumber = operate(myArr[i], myArr[i - 1], myArr[i + 1]);
                        myArr.splice(i - 1, 3, currentNumber.toString());
                        i = 0;
            }}} else {
                for (let j = 0; j < myArr.length; j++) {
                    if (myArr[j] === '-' || myArr[j] === '+') {
                        currentNumber = operate(myArr[j], myArr[j - 1], myArr[j + 1]);
                        myArr.splice(j - 1, 3, currentNumber.toString());
                        j = 0;
            }}}
        };
        
        while (myArr.length > 1) { calculate() };

        // set the current number to the only one left in the array
        currentNumber = Number(myArr[0]).toFixed(3);
        if (currentNumber.length < 12) { displayValue.style.fontSize = '40px' };

        // show error when the number is either too long or an operation can not be solved 
        // with the given given numbers/operators 
        if (isNaN(currentNumber) || currentValue.length < 5 || currentNumber.length > 17) {             
            displayValue.textContent = 'ERROR';
            document.getElementById('currentCalculation').textContent = '';
            currentNumber = '';
            currentValue = '';
            return
        }

        // show the user his whole calculations
        document.getElementById('currentCalculation').textContent = displayActiveOperation() + '=';
        currentValue = '';
        display();


    } else if (el.value === '.') {
        // in order to avoid having 2 dots it's checked first if there's already one if not, one is added
        if (!currentNumber.includes('.') && currentNumber.length > 0) {
            currentNumber += el.value;
            displayValue.textContent += ',';


    }} else if (el.value === '⌫') {
        // each time the DEL button is pressed the last char is removed
        if (currentNumber.slice(-2, -1) === '.') { 
            displayValue.textContent = currentNumber.toString().slice(0, -2) + ',';
            currentNumber = currentNumber.toString().slice(0, -1);
        } else if (!currentNumber) { return 
        } else {
            currentNumber = currentNumber.toString().slice(0, -1);
            display()
        }


    } else /* operators */ {
        // check for a number before actually accepting the operator
        if (currentNumber) {
            // add the operators to the operating string
            currentValue += currentNumber + ' ' + el.value + ' ';
            // reset the display number to start over when typing after the operator
            document.getElementById('currentCalculation').textContent = displayActiveOperation();
            currentNumber = '';
        } else if (!currentNumber && isNaN(currentValue[-2])) {
            // check for the last character in currentValue, no number means the user may have
            // changed his mind and wants to use another operator and so the current operator 
            // will be swapped for the newly pressed one.
            currentValue = currentValue.slice(0, -2) + el.value + ' ';
            document.getElementById('currentCalculation').textContent = displayActiveOperation();
        }
}}));





// KEYBOARD SUPPORT
window.addEventListener('keydown', (event) => {
    // store the key that was pressed
    const key = event.key;

    // check for keyboard pressed numbers and press the corresponding button on the calculator
    for (let i = 0; i < 10; i++) {
        switch (key) {
            // the i will increase each time changing the case and the id of the button
            case i.toString() :
                document.getElementById(i.toString()).click();
                break; 
        }
    }

    // two arrays with the items inside ordered as we need them are needed for another loop
    // instead of writing more lines of code. For some reason i couldn't get the simple if 
    // statement to work inside the loop, switch was my alternative
    const symbolsArr = ['C', '±', '%', '÷', '×', '-', '+', '=', '⌫', '.'];
    const keyArr = ['Escape', '±', '%', '/', '*', '-', '+', '=', 'Backspace', '.'];
    for (let j = 0; j < 10; j++) {
        switch (key) {
            case keyArr[j] :
                document.getElementById(symbolsArr[j]).click();
                break; 
        }
    }

});





// FUNCTIONS
function add(a, b) { return Number(a) + Number(b) }
function subtract(a, b) { return Number(a) - Number(b) }
function multiply(a, b) { return a * b }
function divide(a, b) { return a / b }


function operate(operator, firstNumber, secondNumber) {
    switch (operator) {
        case '+' : 
            return add(firstNumber, secondNumber);
        case '-' :
            return subtract(firstNumber, secondNumber);
        case '*' :
            return multiply(firstNumber, secondNumber);
        default :
            return divide(firstNumber, secondNumber);
}}


function display() {
    let displayTxt = currentNumber;
    // clear the screen before displaying a new number
    displayValue.textContent = '';
    // make sure the number doesn't get outside the display of the calculator
    if (displayTxt < 999999999999) {
        displayValue.textContent = Number(displayTxt).toLocaleString('de-DE', {maximumFractionDigits: 3});
    } else { 
        displayValue.style.fontSize = '25px';
        displayValue.textContent = Number(displayTxt).toLocaleString('de-DE', {maximumFractionDigits: 3});
    }
}


function displayActiveOperation() {
    // save the currentValue as a string and replace the JS understood operators 
    // with the ones the user sees on the calculator
    let fullOperationTxt = currentValue.replace(/\*/g, '×')
                                       .replace(/\//g, '÷')
                                       .replace(/\./g, ',');
    
    // create an array to loop through it and format the numbers
    const formatArr = fullOperationTxt.split(' ');
    fullOperationTxt = '';
    
    formatArr.forEach(el => {           
        if (!isNaN(el) && el !== '') {
            fullOperationTxt += Number(el).toLocaleString('de-DE', {maximumFractionDigits: 3}) + ' ';
        } else {fullOperationTxt += el + ' '};
    })
    
    // return the string with the formatted numbers
    return fullOperationTxt;
}
