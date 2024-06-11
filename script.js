let firstOperator=null;
let operand='';
let newOperator=true;

const inputs=document.querySelectorAll('.input');
const display=document.querySelector('.display');

const operate=function(firstOperator,secondOperator,operand){
    switch (operand){
        case'+': return firstOperator + secondOperator;
        case'-': return firstOperator - secondOperator;
        case'*': return firstOperator * secondOperator;
        case'/': {
            if(secondOperator==0) return Infinity
            else return firstOperator / secondOperator;}
        default: return firstOperator;
    }       
}

function addDigits(addedDigit){
    if (newOperator) {display.innerHTML='';newOperator=false;}
    if(display.innerHTML.length<11) display.innerHTML+=addedDigit
}

function addDecimal(){if(!display.innerHTML.includes('.')&&display.innerHTML.length<11) 
    {display.innerHTML+='.'; newOperator=false}}

function actionOperand(inputOperand){ 
    if(operand&&newOperator)  {operand=this.innerHTML;return} 
    if(!firstOperator){
        firstOperator=display.innerHTML;
        operand=inputOperand;
        newOperator=true;
    }
    else if(firstOperator){
        let secondOperator=display.innerHTML;
        firstOperator=operate(+firstOperator,+secondOperator,operand);
        if(Math.abs(firstOperator)>99999999999) display.innerHTML='ERR';
        else 
            {if(firstOperator%1) firstOperator=+firstOperator.toFixed(10-(Math.trunc(firstOperator)+'').length)        
            display.innerHTML=firstOperator;}
        operand=inputOperand;
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

inputs.forEach(el=>el.addEventListener('click',function(){
if ([...el.classList].includes('digit')) addDigits(this.textContent);
else if([...el.classList].includes('decimal')) addDecimal.call(el);
else if([...el.classList].includes('operand')) actionOperand(this.innerHTML);
else if([...el.classList].includes('sign')) signChange.call(el);
else if([...el.classList].includes('delete')) deleteDigit.call(el);
else if([...el.classList].includes('clear')) clearAll.call(el);
}))

//Keyboard support
document.addEventListener('keyup',function({key}){
      if ([0,1,2,3,4,5,6,7,8,9].includes(+key)) addDigits(key);
      else if(key==='.') addDecimal();
      else if(key==='delete' || key==='backspace') deleteDigit();
      else if(['=','+','-','*','/'].includes(key)) actionOperand(key);
})