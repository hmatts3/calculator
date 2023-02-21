let display = document.querySelector('#display');

let numberButtons = Array.from(document.querySelectorAll(".number"));

let operatorButtons = Array.from(document.querySelectorAll(".operator"));

let displayValue = '';

let currentValue; 

for (let i = 0; i<numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', () => {
        unhighlightOperator();
        display.textContent = displayValue += `${numberButtons[i].id}`;
    });
};

let num1;
let num2;
let operator;

// 3 scenarios operator
// one where it is a brand new slate, and it is simply stored as an operator
// two where we have an equals result, and we just want it as an operator
// three where it is used twice in a row, where we want to display the prev result before we continue 

for (let i = 0; i<operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', () => {
        if (num1===undefined && operator===undefined) {
        num1 = parseFloat(displayValue);
        displayValue = '';
        operator = `${operatorButtons[i].id}`;
        highlightOperator(i);
        }
        else if (num1!=undefined && num2===undefined && operator!=undefined) {
        num2 = parseFloat(displayValue);
        displayValue = '';
        operate(operator, num1, num2);
        operator=`${operatorButtons[i].id}`;
        highlightOperator(i);
        }
        else {
        displayValue = '';
        operator = `${operatorButtons[i].id}`;
        highlightOperator(i);
        };
    });
};

function highlightOperator(i) {
    operatorButtons[i].classList.remove('operator');
    operatorButtons[i].classList.add('selected');
};

function unhighlightOperator() {
for (let i = 0; i<operatorButtons.length; i++) {
    operatorButtons[i].classList.remove('selected');
    operatorButtons[i].classList.add('operator');
};
};

let equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', () => {
    num2 = parseFloat(displayValue);
    displayValue='';
    operate(operator, num1, num2);
});


let clearButton = document.querySelector('#clr');
clearButton.addEventListener('click', () => {
    display.textContent = '0';
    displayValue='';
    num1=undefined;
    num2=undefined;
    operator=undefined;
});

function operate(sign,a,b) {
    if (sign === '/') {
        a /= b;
        display.textContent = Number(a.toFixed(5));
        displayValue ='';
    }
    else if (sign === '+') {
        a += num2;
        display.textContent = Number(a.toFixed(5));
        displayValue ='';
    }
    else if (sign === '-') {
        a -= num2;
        display.textContent = Number(a.toFixed(5));
        displayValue ='';
    }
    else if (sign === '*') {
        a *= num2;
        display.textContent = Number(a.toFixed(5));
        displayValue ='';
    };
    unhighlightOperator();
    num1 = a;
    num2=undefined;
    operator=undefined;
};