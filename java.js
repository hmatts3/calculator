
let display = document.querySelector('#display');

// store number Buttons functions
let numberButtons = document.querySelectorAll(".number");
let buttonsList = Array.from(numberButtons);

// store operator buttons functions
let operatorButtons = document.querySelectorAll(".operator");
let operatorsList = Array.from(operatorButtons);


let string = '';

// number click
for (let i = 0; i<buttonsList.length; i++) {
    buttonsList[i].addEventListener('click', () => {
        display.textContent = string += `${buttonsList[i].id}`;
    });
};

let num1;
let operator;
let newDisplay;

// operator click (store as num1, clear field)
for (let i = 0; i<operatorsList.length; i++) {
    operatorsList[i].addEventListener('click', () => {
        num1 = parseInt(string);
        string= '';
        operator = `${operatorsList[i].id}`;
        display.textContent = '0';
    });
};

// Equals Click (store as num2, operate)
let equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', () => {
    num2= parseInt(string);
    string = '';
    if (operator === '/') {
        display.textContent = divide(num1, num2);
    }
    else if (operator === '+') {
        display.textContent = add(num1, num2);
    }
    else if (operator === '-') {
        display.textContent = subtract(num1, num2);
    }
    else if (operator === '*') {
        display.textContent = multiply(num1, num2);
    };
});


// CLR click
let clearButton = document.querySelector('#clr');
clearButton.addEventListener('click', () => {
    string='0';
    display.textContent = string;
    string='';
})


// still need to do:
// string numbers together for a result
// store prev answer and let it continue
// lots of extra credit
// CSS



function add (num1, num2) {
    return num1+num2;
}

function subtract (num1, num2) {
    return num1-num2;
}

function multiply (num1, num2) {
    return num1*num2;
}

function divide (num1, num2) {
    return num1/num2;
}

function operate(operator,num1,num2) {
    if (operator === '/') {
        divide(num1,num2);
    }
}

function operate(operator,num1,num2) {
    if (operator === '*') {
        multiply(num1,num2);
    }
}

function operate(operator,num1,num2) {
    if (operator === '-') {
        subtract(num1,num2);
    }
}

function operate(operator,num1,num2) {
    if (operator === '+') {
        add(num1,num2);
    }
}

