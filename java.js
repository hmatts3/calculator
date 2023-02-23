let display = document.querySelector('#display');

let numberButtons = Array.from(document.querySelectorAll(".number"));

let operatorButtons = Array.from(document.querySelectorAll(".operator"));

let displayValue = '';

let currentValue; 

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

// if equalsValue is defined, we should be storing 
// num1 is always goign to be undefinged


for (let i = 0; i<operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', () => {
    // stores num1 when num1 does not exist
    if (equalsValue===undefined && num1 === undefined && operator===undefined) {
        num1 = parseFloat(displayValue);
        displayValue = '';
        operator = `${operatorButtons[i].id}`;
        highlightOperator(i);
        }
    // when num1 is stored, and just entering num 2 and operating instead of equal
    else if (num1!=undefined && num2===undefined && operator!=undefined) {
        num2 = parseFloat(displayValue);
        displayValue = '';
        operate(operator, num1, num2);
        operator=`${operatorButtons[i].id}`;
        num1=equalsValue;
        highlightOperator(i);
        }
    // when you do 2 operators (1 equal), then you want to store num1 as equalsValue, so that you can continue the chain UNLESS you overwrite num1
    // why does this work^? Because we are allowing num1 to be the equals value, then the equals value is undefined, and then below, when ......?
    // hm
    
    
    // when num1 is =
    else {
        num1 = equalsValue;
        displayValue = '';
        operator = `${operatorButtons[i].id}`;
        highlightOperator(i);
        };
    })        
};

function operateWithButton(p){
    
}

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


let equalsValue;

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