// CACULATOR PROGRAM

let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

const display = document.querySelector('.display');
const buttons = document.querySelector('.buttons');

buttons.addEventListener('click', (e) => {
    if (!e.target.matches('button')) return;

    const button = e.target;
    const buttonValue = button.textContent;

    if (button.classList.contains('operator')) {
        handleOperator(buttonValue);
        updateDisplay();
        return;
    }

    if (button.classList.contains('clear')) {
        clear();
        updateDisplay();
        return;
    }

    if (button.classList.contains('equals')) {
        handleEquals();
        updateDisplay();
        return;
    }

    inputDigit(buttonValue);
    updateDisplay();
});

function inputDigit(digit) {
    if (waitingForSecondOperand) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}

function calculate(first, second, op) {
    switch(op) {
        case '+': return first + second;
        case '-': return first - second;
        case '×': return first * second;
        case '÷': return first / second;
        case '%': return first % second;
        case '±': return -first;
        default: return second;
    }
}

function handleEquals() {
    if (operator && !waitingForSecondOperand) {
        const inputValue = parseFloat(displayValue);
        const result = calculate(firstOperand, inputValue, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
        operator = null;
    }
}

function clear() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
}

function updateDisplay() {
    display.textContent = displayValue;
}