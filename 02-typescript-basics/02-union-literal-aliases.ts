//==============================================================================
//# union type
//==============================================================================

function combine(a: number | string, b: number | string) {
  let result: number | string;

  if (typeof a === "number" && typeof b === "number") {
    result = a + b;
  } else {
    result = a.toString() + b.toString();
  }
  return result;
}

console.log("combined numbers", combine(1, 2));
console.log("combined string", combine("aaa", "bbb"));

//==============================================================================
//# literal type
//==============================================================================
//| literal types == types where you do not just say what a certain variable or a parameter should hold,
//| but also where you are very clear about the exact value it should hold

function combineV2(
  a: number | string,
  b: number | string,
  // resultConversion: string
  resultConversion: "as-number" | "as-text" //| NB literal type (any other value that is different from one of these two values will not be valid)
) {
  let result: number | string;

  if (
    (typeof a === "number" && typeof b === "number") ||
    resultConversion === "as-number"
  ) {
    result = +a + +b;
  } else {
    result = a.toString() + b.toString();
  }
  return result;
}

console.log("combined numbers", combineV2(1, 2, "as-number"));
console.log("combined numbers", combineV2(1, 2, "as-text"));
console.log("combined string", combineV2("aaa", "bbb", "as-text"));

//==============================================================================
//# type alias
//==============================================================================
//| it can be cumbersome to always repeat the union type or if you have to repeat a complex type
//| you can define a type alias
//| you need to create it with the type keyword
type Combinable = number | string;

const input: Combinable = "a";

type ConversionDescriptor = "as-number" | "as-text";
const conv: ConversionDescriptor = "as-number";

//| NB you can use type aliases to create your own custom types
type User = { name: string; age: number };
const u1: User = { name: "Max", age: 30 };
//| this allows you to avoid unnecessary repetition and manage types centrally

/*
function greet(user: { name: string; age: number }) {
  console.log('Hi, I am ' + user.name);
}
function isOlder(user: { name: string; age: number }, checkAge: number) {
  return checkAge > user.age;
}
*/

function greet(user: User) {
  console.log("Hi, I am " + user.name);
}

function isOlder(user: User, checkAge: number) {
  return checkAge > user.age;
}
