//==============================================================================
// ### Creating a Decorator: Method 1
//==============================================================================
//! a decorator is just a function that you apply to something (e.g. to a class) in a certain way
// best practice to capitalize the name of the decorator
function Logger(constructor: Function) {
  console.log("logging...");
  console.log(constructor);
}

@Logger
class Person {
  name = "Max";
  constructor() {
    console.log("Creating a Person object");
  }
}

const person = new Person();

//! the @ symbol is a special identifier that TS sees/recognizes, and point to the logger function
//! IMPORTANT decorators execute when your class is defined!! not when it is instantiated

//==============================================================================
// ## Working with Decorator Factories
//==============================================================================
console.log("----------------- DECORATORS FACTORIES -----------------------");
//! besides creating a decorator with the method above, we can also define a decorator factory
//! which returns a decorator function, but allows us to configure it when we assign it as a decorator to something

//# decorator factory -- example 1
//! create a decorator factory:
//! we have a function that returns another function
function LoggerFactory(logString: string) {
  return (constructor: Function) => {
    console.log("Rendering LoggerFactory Decorator...");
    console.log("Logging..........", logString);
    console.log("Constructor: ", constructor);
  };
}

@LoggerFactory("MY LOGGER FACTORY") //! NB when we want to apply that decorator, we have to execute it
//! as a function (so that we execute the outer function and we attach the return value,
//! i.e. the inner function, i.e. our valid decorator function, as a decorator to the class)
//! in this way you can add an input to the LoggerFactory and pass it to the inner logger
class PersonNew {
  name = "Max";
  constructor() {
    console.log("Creating a PersonNew object");
  }
}
//! IMPORTANT in this way we can customize the values the decorator function uses when it executes with our factory function

//# decorator factory -- example 2
//! in this decorator factory we want to render some template (i.e. HTML code) into some place in the DOM (where there is this hookId)
function WithTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    console.log("Rendering WithTemplate Decorator...");
    const hookEl = document.getElementById(hookId);
    // const p = new constructor(); // NB this is something else that you could do
    if (hookEl) {
      hookEl.innerHTML = template;
      console.log("constructor", constructor);
      // hookEl.querySelector("h1")!.textContent = p.name; // NB this is something else that you could do
    }
  };
}
@WithTemplate("<h1>TITLEEEEEEE</h1>", "app")
class PersonKKK {
  name = "Max";
  constructor() {
    console.log("Creating a PersonKKK object");
  }
}

/*
You can build really advanced decorators like this one,
which all of a sudden does some magic behind the scenes.
And that is what I mean with metaprogramming.
We add some logic here, which we could expose
if this would be a third-party library
we share with other users.
We could expose this as part of the library,
and anyone who uses our library
can import this decorator function
and add it to a class to then magically
render some content all of a sudden.
*/

//! IMPORTANT this is very similar to Angular syntax!!

/*
And that's also what I meant with metaprogramming.
We're creating things, we're creating decorator functions,
which you might say have some impact on the end user.
In the NP dual render or something on the screen here.
But we do that with a tool
which we expose to other developers.
Because this decorator is such a tool,
which other developers have to use
by adding it to a class in this example.
Otherwise, this would do nothing.
So we provide extra utilities to developers,
which the other developers can use to, for example,
conveniently render something on the screen
for a giving class.
That's the same thing Angular does here,
in a more advanced way,
and it is something that graders are perfect for.
*/

//==============================================================================
// ## Multiple Decorators
//==============================================================================
//! you can add more than one decorator to a class
console.log("--------------- MULTIPLE DECORATORS --------------------");
@LoggerFactory("PersonX Logger factory") //! this will be the 2nd decorator to run
@WithTemplate("<h1>THIS IS H1</h1>", "app2") //! this will be the 1st decorator to run
class PersonX {
  name = "Max";
  constructor() {
    console.log("Creating a PersonX object");
  }
}

//! the  question is: in which oreder do these decorators execute? BOTTOM UP

//==============================================================================
// ## Where can decorators be added?
//==============================================================================
//! IMPORTANT we need a class for any decorator that we want to use, but we don't have to add all decorators directly to the class
console.log("--------------- WHERE TO ADD DECORATORS --------------------");

//% decorator for a class property!
//! if you add a decorator to a property, it receives to arguments
function Log(target: any, propertyName: string | Symbol) {
  // NB target can be either a prototype (if we are dealing with an instance)
  // NB or if we are dealing with a static one, it will be the constructor function
  // NB since we do not know, the type of target should be any
  console.log("property decorator --> ", target, propertyName);
}

//% decorator for accessors
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  // NB target can be either a prototype (if we are dealing with an instance)
  // NB or if we are dealing with a static one, it will be the constructor function
  // NB since we do not know, the type of target should be any
  // NB name is the name of the accessor
  // NB property descriptor (PropertyDescriptor is a type built into typescript)
  console.log("accessor decorator --> ", target, name, descriptor);
}

//% decorators for methods
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("method decorator", target, name, descriptor);
}

//% decorator for parameter
//!
function Log4(
  target: any,
  name: string | Symbol,
  position: number //! the position or number of the argument
) {
  //!name = name of the method in which we used thsi parameter
  console.log("parameter decorator", target, name, position);
}
class Product {
  //% decorator for a class property
  //! you can add a decorator to a property (NB the logger will be executed when the class definition is executed)
  @Log
  title: string;

  private _price: number;

  //% decorator for accessor
  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive!");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  //% decorator for methods
  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

//! what is the order in which decorators run?
//! IMPORTANT all decorators (property decorator, parameter decorator, method decorator, accessor decorator)
//! EXECUTE WHEN YOU DEFINE THE CLASS, NOT WHEN THIS CLASS IS INSTANTIATED
//! these are not decorators that run at runtime when you call a method ro when you work with a property

//==============================================================================
//## returning and changing a class in a class decorator
//==============================================================================
console.log("--------------- RETURN STUFF FROM DECORATORS -----------------");
//! decorators can also return something
//! what you can return depends on the kind of decorator that you are using

//! e.g. inside the decorator function you can return a new constructor function that replaces the old one
function WithTemplateNew(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    console.log("Rendering WithTemplate Decorator...");

    //! basically here we return a class which in the end just creates a constructor function that is based on the original constructor function
    return class extends originalConstructor {
      //NB here basically we are replacing the originalConstructor function with a new constructor
      //NB therefore the template should be rendered to the DOM only if I instantiate the object
      //NB (and not all the time when this decorator function is executed -- which happens as soon as we define the class)
      constructor(..._: any[]) {
        super(); //! to call the originalConstructor function
        console.log("Returning Rende");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

@WithTemplateNew("<h1>TITLEEEEEEE</h1>", "app3")
class PersonJJ {
  name = "Returning and changing a class in a class decorator";
  constructor() {
    console.log("Creating a PersonJJ object");
  }
}

const persjj = new PersonJJ();
console.log(persjj);

// NB you can return values in other decorators, but not in all of them
//! decorators where you canr eturn something are decorators you can add to methods or to accessors
//! decorators on parameters and on properties can return something, but TS will ignore them (non è che non puoi ritornare valori, puoi, ma vengono ignorati)
//! on method and accessor decorators you can return new property descriptors
//! NB to learn more about property descriptors --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty (it is a vanilla JS feature)

//! accessor decorator
function Log2New(
  target: any,
  name: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  console.log("accessor decorator --> ", target, name, descriptor);
  return {
    // here you can set the set keyword,
    // the get keyword, the configurable or the
    // enumerable property and change how this accessor
    // or method is configured.
  };
}

//! method decorator (return something from a method decorator) --> create an "autobind" decorator
// when we click the button, we execute a method on the object

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  //! this decorator should set the this keyword to the object it belongs to
  //! how?
  //! 1. get access to the method that should be called --> throught the descriptor (the value property of this object points to the original function)
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      //! here, "this" will refer to the object that is responsible for triggering this getter method
      //! the getter method will be triggered by the concrete object to which it belongs
      //! so "this" here will refer to the object on which we originally defined the method
      return boundFn;
    },
  };
  return adjustedDescriptor;
  // NB with this TS will replace the old method descriptor (the old method configuration) with this new configuration, which adds this extra getter layer
}

class Printer {
  message = "This works";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}
const myPrinter = new Printer();
const button = document.querySelector("button")!;
//! solution 1: use bind()
// button.addEventListener("click", myPrinter.showMessage.bind(myPrinter)); // NB this is if showMessage() does not have the Autobind decorator
//! solution 2: create a decorator that automatically binds this to the surrounding class (i.e. to the object the .showMessage() method belongs to)
button.addEventListener("click", myPrinter.showMessage);

//==============================================================================
//## Validation with Decorators
//==============================================================================
console.log("--------------- VALIDATION WITH DECORATORS -----------------");

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

//! NB here we include the validation logic inside the class with decorators
class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;

courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("Invalid input, please try again!");
    return;
  }
  console.log(createdCourse);
});
