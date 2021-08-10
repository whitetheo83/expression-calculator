
function eval() {
  // Do not use eval!!!
  return;
}

const expressionCalculator = (str) => {
  const operations = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => {
          if (b === 0) {
              throw 'TypeError: Division by zero.';
          }
          return (a/b);
      }
  }
  const operators = Object.keys(operations);
  const processExpression = (expr) => {
      for (let operator of operators) {
          let regexPattern = `(?!^)(?<!\\${operators.map(el => '\\' + el).join('|')})\\${operator}`;
          let search = [...expr.matchAll(new RegExp(regexPattern, 'g'))];
          let matchedOperation = found[found.length - 1];
          if (matchedOperation) {
              let x = expr.slice(0, matchedOperation.index);
              let y = expr.slice(matchedOperation.index + 1);
              return y ? operations[matchedOperation[0]](processExpression(x), processExpression(y)) : x;
          }
      }
      return +expr;
  }

  const calculate = (str) => {
      str = str.replace(/\s/g, '');
      let arr = [];
      for (let i = 0; i < str.length; i++) {
          if (str[i] === ')') {
              if (!stack.length) {
                  throw 'ExpressionError: Brackets must be paired';
              }
              let toCalculate = str.slice(arr[arr.length - 1] + 1, i);
              let calculated = processExpression(toCalculate);
              str = str.slice(0, arr[arr.length - 1]) + calculated + str.slice(i + 1);
              i = arr.pop();
          } else if (str[i] === '(') {
              arr.push(i);
          }
      }
      if (arr.length) {
          throw 'ExpressionError: Brackets must be paired';
      }
      return processExpression(str);
  }
  return calculate(str);
}

module.exports = {
  expressionCalculator
}
