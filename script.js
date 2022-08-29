const symbols = ['AC', '7', '4', '1', '0', '±', '8', '5',
                '2', '.', '%', '9', '6', '3', 'DEL', '÷',
                '×', '-', '+', '='];

const basicBtn = document.querySelector('.Buttons');

let s = 0;
for (let i = 1; i < 5; i++) {
    let btnColumn = document.createElement('div');
    btnColumn.setAttribute('class', 'column' + i);
    basicBtn.appendChild(btnColumn);

    for (let j = 1; j < 6; j++) {
        let btn = document.createElement('button');
        btn.setAttribute('id', 'btn' + symbols[s]);
        btn.setAttribute('class', 'btn');
        btn.textContent = symbols[s];
        btn.style.backgroundColor = 'lightblue';
        btnColumn.appendChild(btn);
        s++;
    }
};


function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
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