const { useState } = React;

function Calculator() {
    const [prevInput, setPrevInput] = useState('');
    const [currentInput, setCurrentInput] = useState('0');
    const [operation, setOperation] = useState(null);

    function inputNum(num) {
        setCurrentInput(currentInput === '0' ? num : currentInput + num);
    }

    function chooseOperation(op) {
        if (currentInput === '' && op === '-') {
            setCurrentInput(op);
            return;
        }
        if (prevInput !== '') {
            calculate();
        } else {
            setPrevInput(currentInput);
        }
        setOperation(op);
        setCurrentInput('');
    }

    function calculate() {
        let calculation;
        const prev = parseFloat(prevInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case '+':
                calculation = prev + current;
                break;
            case '-':
                calculation = prev - current;
                break;
            case '*':
                calculation = prev * current;
                break;
            case '/':
                calculation = prev / current;
                break;
            default:
                return;
        }
        setCurrentInput(String(calculation));
        setOperation(null);
        setPrevInput('');
    }

    function reset() {
        setPrevInput('');
        setCurrentInput('0');
        setOperation(null);
    }

    return (
        <div className="calculator">
            <div className="display">{currentInput || prevInput}</div>
            <div className="button-row">
                <button onClick={reset}>AC</button>
                <button onClick={() => chooseOperation('/')}>/</button>
                <button onClick={() => chooseOperation('*')}>*</button>
                <button onClick={() => chooseOperation('-')}>-</button>
                <button onClick={() => chooseOperation('+')}>+</button>
            </div>
            <div className="button-row">
                {['7', '8', '9'].map(num => (
                    <button key={num} onClick={() => inputNum(num)}>{num}</button>
                ))}
            </div>
            <div className="button-row">
                {['4', '5', '6'].map(num => (
                    <button key={num} onClick={() => inputNum(num)}>{num}</button>
                ))}
            </div>
            <div className="button-row">
                {['1', '2', '3'].map(num => (
                    <button key={num} onClick={() => inputNum(num)}>{num}</button>
                ))}
            </div>
            <div className="button-row">
                <button onClick={() => inputNum('0')}>0</button>
                <button onClick={calculate}>=</button>
            </div>
        </div>
    );
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
