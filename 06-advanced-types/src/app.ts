// =============================================================================
// ### Intersection types
// =============================================================================
//| intersection types allow us to combine multiple types together

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date; // NB Date is a type supported by TS based on the data object that is built into JS
};

//| if we want to define a type that is a combination of the type Admin and Employee
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Elisa",
  privileges: ["create-server"],
  startDate: new Date(),
};

//| NB intersection types are closely related to INTERFACE INHERITANCE
// (if Admin and Employee were interfaces)
// interface ElevatedEmployee extends Amidn, Employee {}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; //| NB this in the end will be only of type number (because it is the only intersection we have)

/// so the intersection type:
/// if the starter types are union types, the intersection will be only the types that they have in common
/// in caso of object types, the intersection is the combination of the object properties

// =============================================================================
// ### Type Guards
// =============================================================================
//| type guards help us with union types
//| union types give flexibility, but sometimes you need to know which exact type ou are getting at runtime

//| IMPORTANT type guards is just a term that describes the idea or approach of
//| checking if a certain property or method exist bewfore you try to use it
//| for classes --> you can use "instanceof" or "in"
//| for objects --> with "in"
//| for other types --> with "typeof"

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    // NB this is a type guard:
    // NB type guards allow us to use the felxibility of union types
    // NB but still be sure that our code runs correctly at runtime
    return a.toString() + b.toString();
  }
  return a + b;
}

//| there are other ways in which you can write type guards
type UknkownEmployee = Admin | Employee;
function printInfo(emp: UknkownEmployee) {
  // console.log(emp.name, emp.privileges);
  // NB this is red underlined because typescript does not know whether emp has a
  // NB privileges property (only the admin has that)
  // NB you cannot even check whether typeof emp === "oblect" because both Admin and Employee are objects
  // check if the property exist:
  if ("privileges" in emp) {
    console.log("privileges", emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("startDate", emp.startDate);
  }
}

printInfo(e1);
printInfo({ name: "Manu", startDate: new Date() });

// -------------------------
/// when working with classes, you can also use another type of type guard

class Car {
  drive() {
    console.log("Driving ...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck");
  }
  loadCargo(amount: number) {
    console.log("Loading a cargo ..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  // like we did above
  if ("loadCargo" in vehicle) {
    vehicle.loadCargo(100);
  }

  // best practice
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(200);
  }
}

useVehicle(v1);
useVehicle(v2);

// =============================================================================
// ### Discriminated Unions: a special type of type guard
// =============================================================================
// NB discriminated unions is a pattern that you can implement when working with
// NB union types, which makes implementing type guards easier
// NB it is available when you work with object types

// NB we can build a discriminated union by giving every interface (so, every object that should be part of the union)
// NB an extra property --> you can use any name you want, but usually you use "kind" or "type"
// NB remember that we can do it on an interface, and assign a string to it

// we have some interfaces bgut they could also be classes
interface Bird {
  type: "bird";
  flyingSpeed: number;
}
interface Horse {
  type: "horse";
  runningSpeed: number;
}
// here we create our union type
type Animal = Bird | Horse;
function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
    default:
      speed = undefined;
      break;
  }
  console.log("Moving with speed: ", speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

//| NB this is a discriminated union because we have one common property in every object that makes up our union,
//| which describes that object, so that we can use this property that describes this object in our check to have 100% type safety
//| and understand which properties are available for an object and which are not
//| so instead of checking for the existence of a given property, we use a property that we know that exists, to check which type of objects we are working with
//| we also eliminate the danger of misstyping

// =============================================================================
// ### Type Casting (another very useful feature)
// =============================================================================
//| type casting helps you tell TS that some value is of a specific type where TS is not able to detect it on its own,
//| but you know that it will be the case

//| NB there are 2 methods for type casting
//| 1. ANGLE BRACKET TYPE CASTING --> we add something in front of the thing that we want to convert, e.g. <HTMLInputElement> (this clashes with React usage of angle brackets)
//| 2. ndfkjdsn --> add something after the thing you want to type cast with ... as HTMLInputElement

const paragraph = document.querySelector("p"); // NB ts can understand that the element is of type p (or null because maybe this element does not exist on the page)

const paragraph2 = <HTMLParagraphElement>document.getElementById("paragraphId");
paragraph2.innerHTML = "HELLOOOOO";

const userInputElement = <HTMLInputElement>(
  document.getElementById("user-input")
);
userInputElement.value = "Hi there!";

const userInput2 = document.getElementById("user-input-2") as HTMLInputElement; // NB this tells ts that the expression in front of it will yield a value of type HTMLInputElement
userInput2.value = "this is user input 2 !!!";
// NB with type casting you automatically tell TS that the expression will never be null

// IMPORTANT the ! at the end tells TS that the expression in front of it will never yield null
const userInput3 = document.getElementById("user-input-2")!;
// as an alternative to ! --> (userInputElement as HTMLInputElement).value = "hi there"

// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// ### Feature that help us write flexible code
// =============================================================================

// =============================================================================
// ### INDEX TYPES
// =============================================================================
//| this is a feature that allows us to create objects that are more flexible regarding the properties they might hold

//| Let's say your writing an application
//| where you're validating some user input.
//| So you have multiple input fields
//| and depending on what the user enters there
//| and which field it is, you might wanna
//| store and eventually show different error messages.
//| For example, if it's an email field
//| you wanna check whoever it is in the email
//| and if it is not then you wanna
//| add a proper error message to the error container.

interface ErrorContainer {
  //| this should be an object, but it should be flexible regarding what it holds
  //| e.g. { email: "Not a valid email", username : "Must start with a charachter!" }
  //| the problem is that we do not know in advance which exact property names we will have in there
  //| i want to be able to use it on any form I have in my webpage
  //| and I might have different forms with different inputs with different identifiers
  //| so i do not want to restrict myself to just email and username errors
  //| the value type will be a string, but we don't know in advance how many properties or which name the properties will have
  //| for this scenario we can use index types

  [prop: string]: string;
  //| we tell TS that every property that is added to this object based on the ErrorContainer, must have a property namethat can be interpreted as a string,
  //| and the value of the property also must be a string

  //| we can still add predefined properties, but only if they are of the same type as the one above
  id: string;
  // height: number; // this is not allowed!
}

const error: ErrorContainer = {
  id: "gg",
  email: "kkjfnwkejnf@nfjkdsnfk",
  1: "kjnfksdj", // this is ok, the number because it can be converted into a string!
  // we had [prop:number] then here we could not enter the key email
};

// =============================================================================
// ### FUNCTION OVERLOADS
// =============================================================================
//| this feature allows us to define multiple function signatures for one and the same function
//| i.e. we can have multiple possible ways of calling a function with different parameters e.g. to do something inside of that function

function sumUp(a: number, b: number): number; // NB this is a function overload!! --> if we call the function with 2 numbers, it returns 2 numbers
function sumUp(a: string, b: string): string; //| this tells ts that if we call the function with 2 strings, it will return a string
function sumUp(a: string, b: number): string;
function sumUp(a: number, b: string): string;
function sumUp(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string")
    return a.toString() + b.toString();
  return a + b;
}

const result = sumUp("ERlisa", "kdfd");
result.split(" ");
// this is a situation in whcih ts would not be able to correctly infer the result type on its own
// and with function overloads you can be really clear about what is getting returned for the different combinations you might support in your functions

// =============================================================================
// ### OPTIONAL CHAINING
// =============================================================================
//| when you do not know whether in an object, a certain property is defined

const fetchedData = {
  id: "u1",
  name: "Max",
  job: { title: "CEO", description: "My own company" },
};
console.log(fetchedData.job.title);
// if you are not sure whether job exists
console.log(fetchedData?.job?.title);

// =============================================================================
// ### NULLISH COALESCING
// =============================================================================
let userInput = null;
let storedData = userInput || "DEFAULT";
console.log("1", storedData);
// NB the problem with the usage of || is that if userInput = "", "" is a falsy value, therefore this will result in DEFAULT
// NB but if we want to keep "" then you should use

userInput = "";
storedData = userInput || "DEFAULT";
console.log("2", storedData);

storedData = userInput ?? "DEFAULT"; // IMPORTANT if userInput is undefined or null, then "DEFAULT"
console.log("3", storedData);
