let firstOperator=null;
let secondOperator=null;
let operand='';
let newOperator=true;

const digits=document.querySelectorAll('.digit');
const display=document.querySelector('.display');
const decimal=document.querySelector('.decimal');
const operands=document.querySelectorAll('.operand');
const sign=document.querySelector('.sign');
const del=document.querySelector('.delete');
const clr=document.querySelector('.clear');

const add=(a,b)=>a+b;
const subtract=(a,b)=>a-b;
const multiply=(a,b)=>a*b;
const divide=(a,b)=>a/b;

const operate=function(firstOperator,secondOperator,operand){
    switch (operand){
        case'+': return add(firstOperator,secondOperator);
        case'-': return subtract(firstOperator,secondOperator);
        case'*': return multiply(firstOperator,secondOperator);
        case'/': {
            if(secondOperator==0) return Infinity
            else return divide(firstOperator,secondOperator);}
        default: return firstOperator;
    }       
}

function addDigits(){
    if (newOperator) {display.innerHTML='';newOperator=false;}
    if(display.innerHTML.length<11) display.innerHTML+=this.textContent
}

function addDecimal(){if(!display.innerHTML.includes('.')&&display.innerHTML.length<11) 
    {display.innerHTML+=this.textContent; newOperator=false}}

function actionOperand(){ 
    if(operand&&newOperator)  {operand=this.innerHTML;return} 
    if(!firstOperator&&!secondOperator){
        firstOperator=display.innerHTML;
        operand=this.innerHTML;
        newOperator=true;
    }
    else if(firstOperator&&!secondOperator){
        secondOperator=display.innerHTML;
        firstOperator=operate(+firstOperator,+secondOperator,operand);
        if(Math.abs(firstOperator)>99999999999) display.innerHTML='ERR';
        else if(firstOperator%1) firstOperator=+firstOperator.toFixed(10-(Math.trunc(firstOperator)+'').length)        
        else display.innerHTML=firstOperator;
        secondOperator=null;
        operand=this.innerHTML;
        newOperator=true;
    }
}

function deleteDigit(){
    display.innerHTML=display.innerHTML.substring(0,display.innerHTML.length-1)
}

function clearAll(){
    firstOperator=null;
    secondOperator=null;
    operand='';
    newOperator=true;
    display.innerHTML='0';
}

function signChange(){
    display.innerHTML= - +display.innerHTML
}

digits.forEach(el=>el.addEventListener('click',addDigits));
decimal.addEventListener('click',addDecimal);
operands.forEach(el=>el.addEventListener('click',actionOperand));
sign.addEventListener('click',signChange);
del.addEventListener('click',deleteDigit);
clr.addEventListener('click',clearAll)