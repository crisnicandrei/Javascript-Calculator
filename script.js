
const numberButtons=document.querySelectorAll('[data-number]');
const operationButtons=document.querySelectorAll('[data-operation]');
const equalButton=document.querySelector('[data-equal]');
const previousOperandText=document.querySelector('[data-previous-operrand]');
const currentOperandText=document.querySelector('[data-current-operrand]');
const allClear=document.querySelector('[data-clear]');
const btnDelete=document.querySelector('[data-delete]');





class Calculator{
    constructor(currentOperandText,previousOperandText)
    {
        this.clear();
        this.currentOperandText=currentOperandText;
        this.previousOperandText=previousOperandText;
        this.readyToReset=false;
    }
    clear()
    {
        this.currentOperand="";
        this.previousOperand='';
        this.operationButtons=undefined;
    }
    appendNumber(number)
    {
        if(number==="."&&this.currentOperand.includes('.'))
        {
            alert('You cannot do that!');
            return;
        }
        this.currentOperand+=number.toString();
        
    }
    updateDisplay()
    {
        this.currentOperandText.innerText=this.currentOperand;
        this.previousOperandText.innerText=this.previousOperand;
    }
    chooseOperation(operation)
    {
        if(this.currentOperand==="")
        {
            return;
        }
        if(this.previousOperand!='')
        {
            this.compute();
        }
        this.operation=operation;
        this.previousOperand=this.currentOperand.toString()+" " +operation;
        this.currentOperand="";

    }
    compute()   
    {
        let computation;
        const prev=parseFloat(this.previousOperand);
        const curr=parseFloat(this.currentOperand);
        if(isNaN(prev)||isNaN(curr))
        {
            return;
        }
        switch(this.operation)
        {
            case '+':
                computation=prev+curr;
                break;
            case '-':
                computation=prev-curr;
                break;
            case 'x':
                computation=prev*curr;
                break;
            case '/':
                if(curr===0)
                {
                    return
                    alert("You cannot divide by 0!")
                }
                computation=prev/curr;
                break;
            default:
                break;
        }
        this.currentOperand=computation;
        this.previousOperand='';
        this.operation=undefined;   
        this.readyToReset = true;
    }
    delete()
    {
        this.currentOperand=this.currentOperand.slice(0,-1);
    }
}
const calculator=new Calculator(currentOperandText,previousOperandText);

numberButtons.forEach(button =>
    {   
        button.addEventListener('click',()=>
        {
            if(calculator.previousOperand === "" &&
            calculator.currentOperand !== "" &&
            calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
            }
            calculator.appendNumber(button.innerText)
            calculator.updateDisplay();
    })
})
        

    

operationButtons.forEach(button =>
    {
        button.addEventListener('click',()=>
        {
            calculator.chooseOperation(button.innerText);
            calculator.updateDisplay();
        })
    }
);
equalButton.addEventListener('click',()=>
{
    calculator.compute();
    calculator.updateDisplay();
});
allClear.addEventListener('click',()=>
{
    calculator.clear();
    calculator.updateDisplay();
})
btnDelete.addEventListener('click',()=>
{
    calculator.delete();
    calculator.updateDisplay();
})

     
