let runningTotal=0;
let buffer="0";
let previousOperator;
let expression = "";

const screen=document.querySelector('.screen');

function buttonClick(value){
    if(!isNaN(value)){
        handleNumber(value);
    }
    else{
        handleSymbol(value);
    }
    screen.innerText=expression || buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer='0';
            runningTotal=0;
            previousOperator = null;
            expression="";
            break;
        case '=':
            if(previousOperator===null){
                return 
            }
            flushOperator(parseInt(buffer));
            previousOperator=null;
            buffer =runningTotal.toString();
            expression=buffer;
            runningTotal=0;
            break;
        case '←':
            if(buffer.length===1){
                buffer='0';
            }
            else{
                buffer=buffer.slice(0,-1);
                expression=expression.slice(0,-1);
            }
            break;
        case '+':   
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buffer==='0' && runningTotal===0){
        return;
    }

    const intBuffer=parseInt(buffer);

    if(runningTotal===0){
        runningTotal=intBuffer;
    }
    else{
        flushOperator(intBuffer);
    }
    previousOperator=symbol;
    buffer="";
    expression += ` ${symbol} `;
}

function flushOperator(intBuffer){
    switch (previousOperator) {
        case '+':
            runningTotal += intBuffer;
            break;
        case '-':
            runningTotal -= intBuffer;
            break;
        case '×': 
            runningTotal *= intBuffer;
            break;
        case '÷': 
            if (intBuffer === 0) {
                alert("Error: Division by zero!");
                runningTotal = 0;
            } else {
                runningTotal /= intBuffer;
            }
            break;
    }
}

function handleNumber(numberString){
    if(buffer==="0"){
        buffer=numberString;
    }
    else{
        buffer+=numberString;
    }
    expression += numberString;
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click',function(event){
        if(!event.target.classList.contains("calc-button")) return ;

        let buttonText=event.target.innerText.trim();
        buttonText = buttonText.replace('−', '-');

        buttonClick(buttonText);
    });

}

init();