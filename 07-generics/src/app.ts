// NB whenever in TS you see a strange notation like this "Array<T>" you are dealing with a generic type
//| a generic type is a type which is kind of connected with some other type, and it is really flexible regarding which exact type that other type is

//| in JS, the Array type does not care whether you are stonring a list of strings, numbers, objects, or mixed data
// NB in TS, the Array needs to have SOME information

//| method 1 for defining an array:
const array1: any[] = [];
const array2: string[] = [];

//| method 2 for defining an array (with generic type)
const array3: Array<string> = []; // NB between < > you have to define the kind of data that goes into the array
// NB Array<string> is the same as writing string[]
// NB Array<string> is a generic type built into typescript: a type (Array) which is connected to another type (string)
const array4: Array<string | number> = []; // to store strings or numbers

// NB another generic type that is built into TS is the Promise type
//- here you have to declar what type the promise resolves in
//- type Promise which yields a string
// NB Arrya and Promise are the "main" type
const promise: Promise<string> = new Promise((resolve, reject) => {
  try {
    setTimeout(() => {
      resolve("This is done");
    }, 2000);
  } catch (err) {
    reject(err);
  }
});
//- then you get autocompletion for strings (in this case, because you told ts that it yields a string)
//- if you defined Promise<number> than data.split(" ") would be incorrect and ts will let you know
promise.then((data) => {
  data.split(" ");
});

//==============================================================================
// ### Creating a Generic Function
//==============================================================================
//| you can create generic functions and classes

//| imagine that we want to define a function that merges two objects and returns a new object
function merge(objA: object, objB: object) {
  return Object.assign(objA, objB);
}
const mergObj = merge({ name: "Max" }, { age: 30 });
console.log(mergObj);
// NB ts does not know if there is a name property, therefore we cannot do thi:
// console.log(mergObj.name);
//| we could do type casting in this way:
const mergObj2 = merge({ name: "Max" }, { age: 30 }) as {
  name: string;
  age: number;
};
console.log(mergObj2.name); // and this would work

//| but this is cumbersome, therefore the best practice is to turn the function into a generic function in this way:
// T stands for generic type
//| if you hover you see that TS returns the intersection of T & U
function mergeNew<T extends Object, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
//| alternatively
function mergeNew2<T, U>(objA: T, objB: U) {
  return { ...objA, ...objB };
}

const mergObj3 = mergeNew({ name: "Max" }, { age: 30 });
console.log(mergObj3.age);
console.log(mergObj3.name);

//==============================================================================
// ### Type Constraints
//==============================================================================
//| we want to add the constraint that objA and objB should be any kinf of objects (but not simple strings, numbers, or arrays)

//| for generic types, you can set certain constraints regarding the types your generic that your generic types are based on
//| and you can do that with the extends keyword

function mergeNewNew<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

//==============================================================================
// ### Another generic function
//==============================================================================
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  //| with : [T, string] you specify that you will return a tuple, where the
  //| first element is of type T and the secon element of type string
  // NB we only care that the element of type T has a length property (you do not care about whether the element is of type string or array)
  let descriptionText = "Got no value.";

  if (element.length >= 1) {
    descriptionText = `Got ${element.length} element${
      element.length > 1 ? "s" : ""
    }.`;
  }
  return [element, descriptionText];
}

console.log(countAndDescribe("Hi there"));
console.log(countAndDescribe("H"));
console.log(countAndDescribe(["Sports", "Cooking"]));
console.log(countAndDescribe([]));

//==============================================================================
// ### the "keyof" constraint
//==============================================================================
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  //| here we inform ts tha the object should be any kind of object
  //| and the key should be any kind of key in that object
  return "Value" + obj[key];
}

extractAndConvert({ name: "Elisa" }, "name");

//==============================================================================
// ### Generic Classes
//==============================================================================
//| we want to make sure that DataStorage can work with only specific tyes
//| and with const objStorage = new DataStorage<object>(); does not work anynmore
class DataStorage<T extends string | number | boolean> {
  //! this indicates an array of strings, or an array of numbers, or an array of booleans --> NEVER MIXED
  //! with this we say that wen you instantiate an object of this class, you need to choose one type of data type and stick to it when adding or removing

  private data: T[] = [];
  //! with union:
  //! this data:(string | number | boolean)[] indicates that it can be a mixed array
  //! to define non mixable arrays: string[] | number[] | boolean[]
  //! but with this method (when using union types) you might encounter errors when adding or removing

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    // NB this is not a good strategy if you work with non primitive values (i.e objects or arrays)
    // NB if .indexOf(item) does not find anything, it returns -1, which is the last element of the array

    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Elisa");
textStorage.addItem("Franco");
textStorage.removeItem("Franco");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
// const numberStorage = new DataStorage<number | string>(); // this would allow you to store in there both strings and numbers
numberStorage.addItem(1);
numberStorage.addItem(3);
numberStorage.addItem(2);
numberStorage.removeItem(1);
console.log(numberStorage.getItems());

//! NB class methods can have their own generic type, it can be different from the generic type of the class

/*
// NB but we would have a problem with removing an item object
const objStorage = new DataStorage<object>();
objStorage.addItem({ name: "Elisa" });
objStorage.addItem({ name: "Franco" });
//...
objStorage.removeItem({ name: "Franco" });
console.log(objStorage.getItems());
//- the only way to make it work would be to store the object in a constant and then passing that const to the removeItem
const e = { name: "Elisa" };
objStorage.removeItem(e);
console.log(objStorage.getItems());
*/

//==============================================================================
// ### Generic Built-in Utility Types: Partial, Readonly NB they are all generic types!
//==============================================================================
//! https://www.typescriptlang.org/docs/handbook/utility-types.html --> full list of Utility Types

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  //% Partial wraps our own type, and changes it to a type where all these properties are optional
  //| therefore we can set it to an empty type initially, and then add all the things step by step
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  //| but in the end you have to convert it to CourseGoal (because it is still of type Partial)
  return courseGoal as CourseGoal;
}

//! if you want to make sure that this is a locked, reaonly array (we can always add more or remove, but we want TS to yell at us if we try it)
const names: Readonly<string[]> = ["Max", "Anna"];
// names.push("Manu");
// names.pop();
//! NB you can also mark objects as readonly (so that you are not allowed to change properties or add ore remove properties)

//==============================================================================
// ### Generic types vs Union types
//==============================================================================

/*
IMPORTANT

! Union types can be great if you want to have a function which you can
! call with one of these types every time you call it.
! You want union types when you are flexible to have a different type with every method call, with every function call.

! Generic types are great if you want to lock in a certain type; to use the same type throughout the entire
! class instance you create; use the same type throughout the entire function.
! That's where you want the generic type.
! Generic types lock in a type.
*/
