class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.status = 'active'
    this.clear()
    this.updateDisplay()
    }

    changeStatus() {
        if (this.status === 'active') {
            this.status = 'inactive'
        } else {
            this.status = 'active'
        }
    }

    clear () {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete () {
        if (this.status === "inactive") {
            this.clear()
            this.changeStatus()
        }
        console.log(this.currentOperand)
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    negPosConvert() {
        if (this.status === 'inactive') {
            this.changeStatus()
        }
        this.currentOperand = (parseFloat(this.currentOperand) * -1).toString()
    }

    appendNumber (number) {
        if (this.status === 'inactive') {
            this.clear()
            this.changeStatus()
        }
        if (number === '.' && this.currentOperand.toString().includes('.')) return
        if (this.currentOperand === '0') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString()
        }
    }

    selectOperation (operation) {
        if (this.status === 'inactive') {
            this.changeStatus()
        }
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute () {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+': 
              computation = prev + current
              break
            case '−': 
              computation = prev - current
              break
            case 'x': 
              computation = prev * current
              break
            case '÷': 
              computation = prev / current
              break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFactionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-compute]')
const clearAllButton = document.querySelector('[data-clearAll]')
const deleteButton = document.querySelector('[data-clear]')
const posNegConvertButton = document.querySelector('[data-posNeg]')
const previousOperandText = document.querySelector('[data-previousOperand]')
const currentOperandText = document.querySelector('[data-currentOperand]')

const calculator = new Calculator(previousOperandText, currentOperandText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
    calculator.changeStatus()
})

clearAllButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

posNegConvertButton.addEventListener('click', button => {
    calculator.negPosConvert()
    calculator.updateDisplay()
})

