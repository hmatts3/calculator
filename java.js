let display = document.querySelector('#display');

let numberButtons = Array.from(document.querySelectorAll(".number"));

let operatorButtons = Array.from(document.querySelectorAll(".operator"));

let displayValue = '';

let currentValue; 

for (let i = 0; i<numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', () => {
        display.textContent = displayValue += `${numberButtons[i].id}`;
    });
};

let num1;
let num2;

// 3 scenarios operator
// new slate 1 undef (want operator to store num1)
// equals 2 is undef (want operator to store num2)
// both are def (want operator to equal)

for (let i = 0; i<operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', () => {
        if (num1===undefined) {
        num1 = parseInt(displayValue);
        displayValue = '';
        operator = `${operatorButtons[i].id}`;
        }
        else if (num2===undefined) {
        num2 = parseInt(displayValue);
        displayValue = '';
        operator = `${operatorButtons[i].id}`;
        }
        else {
        displayValue = '';
        operator = `${operatorButtons[i].id}`;
        if (operator === '/') {
            num1 /= num2;
            display.textContent = num1;
            displayValue ='';
        }
        else if (operator === '+') {
            num1 += num2;
            display.textContent = num1;
            displayValue ='';
        }
        else if (operator === '-') {
            num1 -= num2;
            display.textContent = num1;
            displayValue ='';
        }
        else if (operator === '*') {
            num1 *= num2;
            display.textContent = num1;
            displayValue ='';
        };
        num2=undefined;
        }
    });
};

let equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', () => {
    num2 = parseInt(displayValue);
    displayValue='';
// why didn't this work as a separate function
    if (operator === '/') {
        num1 /= num2;
        display.textContent = num1;
        displayValue ='';
    }
    else if (operator === '+') {
        num1 += num2;
        display.textContent = num1;
        displayValue ='';
    }
    else if (operator === '-') {
        num1 -= num2;
        display.textContent = num1;
        displayValue ='';
    }
    else if (operator === '*') {
        num1 *= num2;
        display.textContent = num1;
        displayValue ='';
    };
    num2=undefined;
});


let clearButton = document.querySelector('#clr');
clearButton.addEventListener('click', () => {
    display.textContent = '0';
    displayValue='';
    num1=undefined;
    num2=undefined;
    operator=undefined;
});

function operate(operator,num1,num2) {
    if (operator === '/') {
        num1 /= num2;
        display.textContent = num1;
        displayValue ='';
    }
    else if (operator === '+') {
        num1 += num2;
        display.textContent = num1;
        displayValue ='';
    }
    else if (operator === '-') {
        num1 -= num2;
        display.textContent = num1;
        displayValue ='';
    }
    else if (operator === '*') {
        num1 *= num2;
        display.textContent = num1;
        displayValue ='';
    };
};