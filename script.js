const symbols = ['AC', '7', '4', '1', '0', '±', '8', '5',
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
    // also adding their symbol (as value and textContent)
    for (let j = 1; j < 6; j++) {
        let btn = document.createElement('button');
        btn.setAttribute('class', 'btn');
        btn.value = symbols[s];
        btn.textContent = symbols[s];
        btnColumn.appendChild(btn);
        s++;
    }
};

// get the display element
const displayValue = document.getElementById('displayWindow');
// select all buttons
const button = document.querySelectorAll('.btn');
// create a variable to keep track of the number that has to be shown to the user
let currentNumber = '';
// create a variable that's needed to store the whole operation
let currentValue = '';

// Add an Event Listener for each button that does different things based on their value.
button.forEach(el => el.addEventListener('click', () => { 
    // if the value is not NaN it's a number which is displayed when clicked on it
    if (!isNaN(el.value)) {
        // add the number to the current number that is displayed 
        currentNumber += el.value;
        // print the number on screen
        display();
    } else if (el.value === 'AC') {
        // reset everything when AC is pressed
        currentValue = '';
        currentNumber = '';
        // show nothing / clear the calculator's display
        displayValue.textContent = '0';
    } else if (el.value === '±') {
        // to get the negative number we simply subtract the double of it
        // it also works from negative to positive ;)
        currentNumber -= currentNumber * 2;
        display();
    } else if (el.value === '%') {
        // for the percentage we simply show that number divided by 100
        currentNumber = currentNumber / 100;
        display();
    } else if (el.value === '=') {
        // replacing the symbols with operators understood by JS
        currentValue += currentNumber;
        currentValue = currentValue.replace(/×/g, '*').replace(/÷/g, '/');
        // check if the user pressed equal after a operator button, remove the operator if so
        if (currentValue.charAt(currentValue.length - 1) === ' ') {
            currentValue = currentValue.slice(0, -3);
        }

        const myArr = currentValue.split(' ');

        function calculate() {
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
        }}}};
        
        while (myArr.length > 1) {
            calculate();
        };

        currentNumber = myArr[0];
        console.log(currentValue)
        display();
        // TODO operate();
    } else if (el.value === '.') {
        // in order to avoid having 2 dots in our number we check first if there's already one
        // if not we go ahead and add one
        if (!currentNumber.includes('.')) {
            currentNumber += el.value;
            display();
        }
    } else if (el.value === '⌫') {
        // everytime the DEL button is pressed the last char in our number is removed
        currentNumber = currentNumber.toString().slice(0, -1);
        display();
    } else {
        // add the operators to the operating string
        currentValue += currentNumber + ' ' + el.value + ' ';
        // reset the display number to start over when typing after an operator
        currentNumber = '';
    }
}));


function add(a, b) {
    return Number(a) + Number(b);
};

function subtract(a, b) {
    return Number(a) - Number(b);
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function operate(operator, firstNumber, secondNumber) {
    if (operator === '+') {
        return add(firstNumber, secondNumber);
    } else if (operator === '-') {
        return subtract(firstNumber, secondNumber);
    } else if (operator === '*') {
        return multiply(firstNumber, secondNumber);
    }
    
    return divide(firstNumber, secondNumber);
}

function display() {
    displayValue.textContent = currentNumber;
}

function keySupport() {
    window.addEventListener('keydown', (event) => {
        return event.key;
})};