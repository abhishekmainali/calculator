const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
  history: []  // Store calculation history
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
  } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) return;
  if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
      calculator.operator = nextOperator;
      return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
      calculator.firstOperand = inputValue;
  } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
      calculator.firstOperand = result;

      // Add calculation to history
      const historyEntry = `${firstOperand} ${operator} ${inputValue} = ${result}`;
      calculator.history.push(historyEntry);
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') return firstOperand + secondOperand;
  if (operator === '-') return firstOperand - secondOperand;
  if (operator === '*') return firstOperand * secondOperand;
  if (operator === '/') return firstOperand / secondOperand;
  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}

// History Modal Functionality
const historyModal = document.getElementById("history-modal");
const historyList = document.getElementById("history-list");
const historyButton = document.getElementById("show-history");
const closeButton = document.querySelector(".close");

historyButton.addEventListener('click', () => {
    // Slide in the history modal
    historyModal.classList.add('show');
    
    // Populate history list
    historyList.innerHTML = '';
    calculator.history.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = entry;
        historyList.appendChild(listItem);
    });
});

closeButton.addEventListener('click', () => {
    // Slide out the history modal
    historyModal.classList.remove('show');
});

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == historyModal) {
        historyModal.classList.remove('show');
    }
};

// Attach event listeners to calculator buttons
const keys = document.querySelector('.calculator-buttons');
keys.addEventListener('click', event => {
  const { target } = event;
  const { value } = target;
  if (!target.matches('button')) return;

  switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
          handleOperator(value);
          break;
      case '=':
          handleOperator(calculator.operator);
          break;
      case '.':
          inputDecimal(value);
          break;
      case 'all-clear':
          resetCalculator();
          break;
      default:
          if (Number.isInteger(parseFloat(value))) {
              inputDigit(value);
          }
  }

  updateDisplay();
});

// Initialize display
updateDisplay();
//loder 
// Function to hide the loader and show the app
window.onload = function() {
  // Simulate a loading time for demonstration
  setTimeout(() => {
      document.getElementById("loader").style.display = "none"; // Hide the loader
      document.getElementById("app").style.display = "block";  // Show the app
  }, 1500);  // Adjust the timeout as needed, 1500ms is 1.5 seconds
};
