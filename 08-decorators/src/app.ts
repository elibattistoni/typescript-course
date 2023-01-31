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
//! besides creating a decorator with the method above, we can also define a decorator factory
//! which returns a decorator function, but allows us to configure it when we assign it as a decorator to something

//# decorator factory -- example 1
//! create a decorator factory:
//! we have a function that returns another function
function LoggerFactory(logString: string) {
  return (constructor: Function) => {
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
    console.log("Creating a PersonNew object");
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
