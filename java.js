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
    })        
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
    unhighlightOperator();
});

function operate(sign,a,b) {
    if (sign === '/') {
        a /= b;
    }
    else if (sign === '+') {
        a += num2;
    }
    else if (sign === '-') {
        a -= num2;
        
    }
    else if (sign === '*') {
        a *= num2;
    };
    display.textContent = Number(a.toFixed(5));
    displayValue='';
    unhighlightOperator();
    num1 = a;
    num2=undefined;
    operator=undefined;
};




// keyboard

document.addEventListener('keydown', (event) => {    
    if (event.key>=0 && event.key<=10) { 
    display.textContent = displayValue += event.key;
    unhighlightOperator();
    }
    else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        let operatorKeyed;
        if (event.key==='+') {
            operatorKeyed = document.querySelector(`.plus`);
        }
        else if (event.key==='-') {
            operatorKeyed = document.querySelector(`.minus`);
        }
        else if (event.key==='*') {
            operatorKeyed = document.querySelector(`.times`);
        }
        else if (event.key==='/') {
            operatorKeyed = document.querySelector(`.divide`);
        };
        if (num1===undefined && operator===undefined) {
            num1 = parseFloat(displayValue);
            displayValue = '';
            operator = `${event.key}`;
            }
        else if (num1!=undefined && num2===undefined && operator!=undefined) {
            num2 = parseFloat(displayValue);
            displayValue = '';
            operate(operator, num1, num2);
            operator=`${event.key}`;
            }
        else {
            displayValue = '';
            operator = `${event.key}`;
            };
        operatorKeyed.classList.add('selected');
        operatorKeyed.classList.remove('operator');
    }
    else if (event.key==='=' || event.key === 'Enter') {
        num2 = parseFloat(displayValue);
        displayValue='';
        operate(operator, num1, num2);
    }
    else if (event.key==='Escape') {
        display.textContent = '0';
        displayValue='';
        num1=undefined;
        num2=undefined;
        operator=undefined;
        unhighlightOperator();
    } 
    });



    // Can Add Backspace + +- button
    // can disable additional decimals, double operators, or overwrite operator, 