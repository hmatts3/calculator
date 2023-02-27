let display = document.querySelector('#display');

let numberButtons = Array.from(document.querySelectorAll(".number"));

let operatorButtons = Array.from(document.querySelectorAll(".operator"));

let displayValue = '';

let currentValue; 

let equalsValue;

for (let i = 0; i<numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', () => {
        unhighlightOperator();
        display.textContent = displayValue += `${numberButtons[i].id}`;
        equalsValue=undefined;
    });
};

let num1;
let num2;
let operator;

for (let i = 0; i<operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', () => {
    // stores num1 when num1 does not exist
    // when no num1 or equal value
    if (!equalsValue && !num1) {
        num1 = parseFloat(displayValue);
        displayValue = '';
        operator = `${operatorButtons[i].id}`;
        highlightOperator(i);
        }
    // when num1 is stored, and just entering num 2 and operating instead of equal
    else if (equalsValue && !num1) {
        num1 = equalsValue;
        displayValue = '';
        operator = `${operatorButtons[i].id}`;
        highlightOperator(i);
        }
    // (when num1 stored, operator stored, just doing a third op (new num2, calculate, new operator)
    else if (num1 && operator) {
        num2 = parseFloat(displayValue);
        displayValue = '';
        operate(operator, num1, num2);
        operator=`${operatorButtons[i].id}`;
        num1=equalsValue;
        highlightOperator(i);
        }
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
equalsButton.addEventListener('click', function() {
    num2 = parseFloat(displayValue);
    displayValue='';
    operate(operator, num1, num2);
    });

let clearButton = document.querySelector('#clr');
clearButton.addEventListener('click', function() {
    display.textContent = '0';
    displayValue='';
    num1=undefined;
    num2=undefined;
    operator=undefined;
    equalsValue=undefined;
    unhighlightOperator();
});


function operate(sign,a,b) {
    if (sign === '/') {
        a /= b;
    }
    else if (sign === '+') {
        a += b;
    }
    else if (sign === '-') {
        a -= b;
        
    }
    else if (sign === '*') {
        a *= b;
    };
    display.textContent = Number(a.toFixed(5));
    displayValue='';
    unhighlightOperator();
    equalsValue= a;
    num1=undefined;
    num2=undefined;
    operator=undefined;
};







// keyboard

document.addEventListener('keydown', (event) => {    
    if (event.key>=0 && event.key<=10) { 
    display.textContent = displayValue += event.key;
    unhighlightOperator();
    equalsValue=undefined;
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
        if (!equalsValue && !num1) {
            num1 = parseFloat(displayValue);
            displayValue = '';
            operator = `${event.key}`;
            }
        // when num1 is stored, and just entering num 2 and operating instead of equal
        else if (equalsValue && !num1) {
            num1 = equalsValue;
            displayValue = '';
            operator = `${event.key}`;
            }
        // (when num1 stored, operator stored, just doing a third op (new num2, calculate, new operator)
        else if (num1 && operator) {
            num2 = parseFloat(displayValue);
            displayValue = '';
            operate(operator, num1, num2);
            operator=`${event.key}`;
            num1=equalsValue;
            }
        operatorKeyed.classList.add('selected');
        operatorKeyed.classList.remove('operator');
    }
    else if (event.key==='=' || event.key === 'Enter') {
        num2 = parseFloat(displayValue);
        displayValue='';
        operate(operator, num1, num2);;
    }
    else if (event.key==='Escape') {
        display.textContent = '0';
        displayValue='';
        num1=undefined;
        num2=undefined;
        operator=undefined;
        equalsValue=undefined;
        unhighlightOperator();
    } 
    });



    // Can Add Backspace + +- button
    // can disable additional decimals, double operators, or overwrite operator, 

    //why didn't clear button op & equal button op as a separate function work?