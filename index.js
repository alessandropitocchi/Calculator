const numbers = document.querySelectorAll('.numbers')
const operator = document.querySelectorAll('.operator')
const result = document.querySelector('.result')
const screen = document.querySelector('.screen')
const clearButton = document.querySelector('.clearBtn')
const equalBtn = document.querySelector('.equalBtn')
const deleteBtn = document.querySelector('.deleteBtn')
const pointBtn = document.querySelector('.pointBtn')

let firstValue = ''
let secondValue = ''
let op = null
let reset = false

clearButton.addEventListener('click', fullResetScreen);
equalBtn.addEventListener('click', calc)
deleteBtn.addEventListener('click', deleteNumber)
pointBtn.addEventListener('click', addPoint)
document.addEventListener('keydown', keyboardInput)

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
    if(op !== null ) calc()
    op = operator 
    firstValue = result.textContent
    if (op !== null){
        screen.textContent = `${firstValue} ${op}`
    } else {
        screen.textContent = ''
    }
    reset = true
}

function round(n){
    return Math.round(n * 1000) / 1000
}

function addPoint(){
    if (reset) resetScreen()
    if (result.textContent === '') result.textContent = '0'
    if (result.textContent.includes('.')) return
    result.textContent += '.'
}

function deleteNumber(){
    result.textContent = result.textContent.slice(0, -1)
}

function calc(){
    if (op === '/' && result.textContent === '0'){
        alert('ERROR!')
        fullResetScreen()
        return
    }
    secondValue = result.textContent
    result.textContent = round(operate(op, firstValue, secondValue))
    op = null
}

function resetScreen(){
    result.textContent = ''
    reset = false
}

function fullResetScreen(){
    result.textContent = '0'
    screen.textContent = '' 
    firstValue = ''
    secondValue = ''
    op = null
}

function keyboardInput(e){
    if(e.key == '/' || e.key == '-' || e.key == '+' || e.key == '*' ) setValue(e.key)
    if(e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if(e.key == '=' || e.key == 'Enter') calc()
    if(e.key == '.' || e.key == ',') addPoint()
    if(e.key == 'F2') fullResetScreen()
    console.log(e.key)
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