const button = document.querySelector("button");

const input1 = document.getElementById("num1")! as HTMLInputElement;
//| NB the ! (excalamtion mark) basically tells TS that this will never yield null, that this will always find an element
//| NB you can also type cast the constant to an HTMLInputElement, because you know that it will always be an HTMLInputElement
//| so you let TS know which type of element this will be
//| NB as HTMLInputElement is a syntax called "type casting"
//| IMPORTANT with this we are forced to be clear about our intentions and to really think about our code and double check it, which is great
//| IMPORTANT the biggest advantage is the addition of types

const input2 = document.getElementById("num2")! as HTMLInputElement;

function add(num1: number, num2: number) {
  return num1 + num2;
}

//| NB TS understands that what we get from input.value is a string (not a number)
//| therefore if we do not convert it to a number it throws a compiler error + highlights this in the IDE
button.addEventListener("click", function () {
  console.log(add(+input1.value, +input2.value));
});
