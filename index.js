const numbers = document.querySelectorAll('.numbers')
const operator = document.querySelectorAll('.operator')
const result = document.querySelector('.result')
const screen = document.querySelector('.screen')
const clearButton = document.querySelector('.clearBtn')

let firstValue = ''
let secondValue = ''
let op = ''
let reset = false

clearButton.addEventListener('click', fullResetScreen);

numbers.forEach((number) => {
    number.addEventListener('click', (e) => appendNumber(e.target.getAttribute('value')))
})

operator.forEach((operator) => {
    operator.addEventListener('click', (e) => setValue(e.target.getAttribute('value')))
})

function appendNumber(number){
    if( result.textContent === '0' || reset){
        resetScreen()
    }
    result.textContent += number
}

function setValue(operator){
    if(op !== '' ) calc()
    op = operator 
    firstValue = result.textContent
    screen.textContent = `${firstValue} ${op}`
    reset = true
}

function calc(){
    secondValue = result.textContent
    result.textContent = operate(op, firstValue, secondValue)
    op = ''
}

function resetScreen(){
    result.textContent = ''
}

function fullResetScreen(){
    result.textContent = '0'
    screen.textContent = '' 
}

function add(x, y){
    return x + y
}

function subtract(x, y){
    return x - y
}

function multiply(x, y){
    return x * y
}

function divide(x, y){
    return x / y
}

function operate(operator, x, y){
    x = Number(x)
    y = Number(y)
    switch(operator){
        case '/':
            return divide(x, y)
            break;
        case '*':
            return multiply(x, y)
            break;
        case '+':
            return add(x, y)
            break;
        case '-':
            return subtract(x, y)
            break;
            
    }
}
operate()