//==============================================================================
//# core data types: number, string, boolean
//==============================================================================

function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  const result = n1 + n2;
  if (showResult) {
    console.log(phrase, result);
  }
  return result;
}

const printResult = true; //| NB TYPE INFERENCE --> TS detects that printResult is a boolean, because we initialized it to a boolean
const resultPhrase = "Result is: ";

add(2, 3, printResult, resultPhrase);
