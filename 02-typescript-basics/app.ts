//==============================================================================
//# function return type & void
//==============================================================================
//| NB if you do not have specific reason for explicitly setting the type, then you should not set the type
//| and instead let TS infer the type

//| : void if your function does not return anything

function printResult(num: number): void {
  console.log("result: ", num);
}

printResult(3);

//| if you have an empty return then :undefined can be used
function myFunc(): undefined {
  return;
}

//==============================================================================
//# functions as types
//==============================================================================
let combineValues: Function;

// combineValues = 4

//| function types are types that describe a function regarding the parameters and the return value of that function
let combVV: () => number;
//| NB combVV accepts any function that takes no parameters and then returns a number
// comVV = ...

//==============================================================================
//# function types & callbacks
//==============================================================================

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, (res) => {
  console.log(res);
});

//==============================================================================
//# unknown type
//==============================================================================
let userInput: unknown;
let userName: string;

// userName = "max";
// userInput = userName; //| NB error because the type unknown is not assignable to type string
//| if userInput: any, this would work

//| NB therefore unknown is a better choice than any
//| you can just add an extra checking

//==============================================================================
//# never type
//==============================================================================
//| never is another type that functions can return

function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}
generateError("An error occurred", 500);
//| this function returns never --> it never produces a return value
//| this function always crashes the script
//| you can also return void, but if you set never you can make your intentions
//| really clear to other developers that this function is intended to never return anything
//| and to really crash or break your script
//| another function that returns never is a function which has a while loop inside
